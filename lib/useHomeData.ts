import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { currentHp, currentStreak, dateStr, getLevel, heartCount, longestStreak, today, xpRate } from './game'

// done 함 / miss 빠짐 / today 오늘(아직) / future 아직 안온날
export type DayState = 'done' | 'miss' | 'today' | 'future'

export type HomeData = {
  charName: string
  username: string // 아이디
  level: number
  hearts: number
  xpRate: number
  streak: number
  maxStreak: number // 최대 연속 학습
  monthDays: number // 이번달 누적 출석
  doneDays: string[] // 학습한 날짜들 (달력)
  week: DayState[] // 월~일 7개
  left: number // 오늘 남은 학습 개수
  demo: boolean
}

// 로그인 안했거나 db 없을때 보여줄 값 (피그마 화면이랑 똑같이)
export const DEMO: HomeData = {
  charName: 'RINO',
  username: 'rino1234',
  level: 5,
  hearts: 3,
  xpRate: 0.82,
  streak: 12,
  maxStreak: 28,
  monthDays: 16,
  doneDays: [],
  week: ['done', 'miss', 'done', 'done', 'done', 'future', 'future'],
  left: 5,
  demo: true,
}

export const TOTAL_MISSIONS = 5

function thisWeek() {
  const now = new Date()
  const mon = new Date(now)
  mon.setDate(now.getDate() - ((now.getDay() + 6) % 7))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(mon)
    d.setDate(mon.getDate() + i)
    return dateStr(d)
  })
}

async function load(): Promise<HomeData> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return DEMO

    const { data: p, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (error || !p) return DEMO

    // 최대 연속, 이번달 출석 계산하려고 전체 기록 가져옴
    const { data: logs } = await supabase.from('logs').select('category, done_date')

    const doneDays = [...new Set((logs || []).map((l) => l.done_date as string))].sort()
    const doneSet = new Set(doneDays)
    const t = today()
    const week: DayState[] = thisWeek().map((d) => {
      if (doneSet.has(d)) return 'done'
      if (d < t) return 'miss'
      if (d === t) return 'today'
      return 'future'
    })
    const todayCats = new Set((logs || []).filter((l) => l.done_date === t).map((l) => l.category))
    const streak = currentStreak(p.streak || 0, p.last_done)

    return {
      charName: p.char_name || 'RINO',
      username: p.username || user.user_metadata?.username || '',
      level: getLevel(p.xp || 0),
      hearts: heartCount(currentHp(p.hp ?? 100, p.last_done)),
      xpRate: xpRate(p.xp || 0),
      streak,
      maxStreak: Math.max(streak, longestStreak(doneDays)),
      monthDays: doneDays.filter((d) => d.startsWith(t.slice(0, 7))).length,
      doneDays,
      week,
      left: Math.max(0, TOTAL_MISSIONS - todayCats.size),
      demo: false,
    }
  } catch {
    return DEMO
  }
}

// 홈, 마이페이지, 달력 데이터. 불러오는 중이면 null
export function useHomeData() {
  const [data, setData] = useState<HomeData | null>(null)
  useEffect(() => {
    load().then(setData)
  }, [])
  return data
}
