'use client'

import { useHomeData } from '../../lib/useHomeData'
import { pad2 } from '../../lib/game'
import TopBar from '../../components/ui/TopBar'
import Asset from '../../components/ui/Asset'
import BottomNav from '../../components/BottomNav'
import s from './ranking.module.css'

// 랭킹은 아직 데모 데이터. 랭킹 api 생기면 여기만 바꾸면 됨
// face: 캐릭터 그림 한장에서 자르는 위치 [가로%, 세로%, 크기%]
const TOP3 = [
  { rank: 2, name: 'AZ***ZING', level: 79, days: 156, face: [-187.25, -50.29, 292.56, 290.22] },
  { rank: 1, name: 'SU***ZZZ', level: 86, days: 380, face: [-98.31, -22.48, 304.53, 302.1] },
  { rank: 3, name: 'he***jo', level: 77, days: 152, face: [-2.29, -159.44, 299.31, 291.71] },
]
const OTHERS = [
  { rank: 4, name: 'SA***RARAG', level: 69, days: 147 },
  { rank: 5, name: 'IN***AKJI', level: 64, days: 140 },
]
const TOTAL = 36855

const CROWN = {
  1: { src: '/images/crowns.png', w: 70, h: 65 },
  2: { src: '/images/crown-silver.png', w: 56, h: 55 },
  3: { src: '/images/crown-bronze.png', w: 49, h: 83 },
} as const

export default function RankingPage() {
  const d = useHomeData()
  if (!d) return <main className={s.page} />

  return (
    <main className={s.page}>
      <TopBar />
      <h1 className={s.title}>브레이노의 두뇌왕은 누구일까요?</h1>
      <p className={s.sub}>{d.charName}님도 브레이노와 함께 학습하고 순위에 올라보세요!</p>

      <ol className={s.podium}>
        {TOP3.map((u) => {
          const c = CROWN[u.rank as 1 | 2 | 3]
          return (
            <li key={u.rank} className={`${s.top} ${s['r' + u.rank]}`}>
              {/* 왕관 숫자 부분이 뚫려있어서 뒤에 검은 칸을 깔아둠 */}
              <span className={s.crown}>
                <span className={s.digit} />
                <Asset src={c.src} alt={`${u.rank}등`} width={c.w} height={c.h} sizes="210px" className={s.crownImg} />
              </span>
              <span className={s.face}>
                <Asset
                  src="/images/rank-avatars.png"
                  alt=""
                  width={1024}
                  height={1024}
                  sizes="180px"
                  className={s.faceImg}
                  style={{ left: `${u.face[0]}%`, top: `${u.face[1]}%`, width: `${u.face[2]}%`, height: `${u.face[3]}%` }}
                />
              </span>
              <p className={'pixel ' + s.topName}>{u.name}</p>
              <p className={'pixel ' + s.topLv}>LV.{pad2(u.level)}</p>
              <p className={s.topLabel}>최대 연속 학습</p>
              <p className={s.topDays}>{u.days}일</p>
            </li>
          )
        })}
      </ol>

      <p className={s.total}>
        총 {TOTAL.toLocaleString()} <small>참여중</small>
      </p>
      <ol className={s.list}>
        {OTHERS.map((u) => (
          <li key={u.rank} className={s.row}>
            <span className={s.rank}>{u.rank}</span>
            <span className={'pixel ' + s.name}>{u.name}</span>
            <span className={'pixel'}>LV.{pad2(u.level)}</span>
            <span className={s.days}>{u.days}일</span>
          </li>
        ))}
      </ol>

      <div className={s.me}>
        <div className={s.row}>
          <span className={s.rank}>-</span>
          <span className={'pixel ' + s.name}>{d.username.toUpperCase()}(ME)</span>
          <span className={'pixel'}>LV.{pad2(d.level)}</span>
          <span className={s.days}>{d.maxStreak}일</span>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
