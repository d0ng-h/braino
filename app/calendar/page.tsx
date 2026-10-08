'use client'

import { useHomeData } from '../../lib/useHomeData'
import { pad2 } from '../../lib/game'
import TopBar from '../../components/ui/TopBar'
import Asset from '../../components/ui/Asset'
import BottomNav from '../../components/BottomNav'
import s from './calendar.module.css'

const WEEK = ['일', '월', '화', '수', '목', '금', '토']

export default function CalendarPage() {
  const d = useHomeData()
  if (!d) return <main className={s.page} />

  // 이번달 달력 칸 (앞쪽 빈칸 + 1일~말일)
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth()
  const blank = new Date(y, m, 1).getDay()
  const last = new Date(y, m + 1, 0).getDate()
  const days = Array.from({ length: last }, (_, i) => i + 1)
  const done = new Set(d.doneDays)

  return (
    <main className={s.page}>
      <div className={s.head}>
        <TopBar />
        <h1 className={s.title}>학습 달력 보기</h1>
        <p className={s.big}>{d.streak}</p>
        <p className={s.bigLabel}>일 연속 학습 중!!</p>
        <div className={s.fire}>
          <Asset src="/images/fire-sticker.png" alt="" width={157} height={157} className={s.sticker} />
          <Asset src="/images/fire.png" alt="" fallback="🔥" width={121} height={121} className={s.flame} />
        </div>
      </div>

      <div className={s.body}>
        <h2 className={s.month}>
          {y}년 {m + 1}월
        </h2>

        <div className={s.summary}>
          <div className={`${s.box} ${s.now}`}>
            <span className={s.check}>
              <Asset src="/images/circle-green.svg" alt="" width={22} height={22} />
              <Asset src="/images/icon-done.svg" alt="" width={17} height={17} className={s.checkIcon} />
            </span>
            <div>
              <p className={s.boxNum}>
                {d.streak}
                <small>일</small>
              </p>
              <p className={s.boxLabel}>현재 연속 학습</p>
            </div>
          </div>
          <div className={`${s.box} ${s.max}`}>
            <Asset src="/images/icon-calendar-fire.png" alt="" fallback="📅" width={47} height={54} className={s.maxIcon} />
            <div>
              <p className={s.boxNum}>
                {d.maxStreak}
                <small>일</small>
              </p>
              <p className={s.boxLabel}>최대 연속 학습</p>
            </div>
          </div>
        </div>

        <div className={s.cal}>
          <ol className={s.grid}>
            {WEEK.map((w) => (
              <li key={w}>{w}</li>
            ))}
            {Array.from({ length: blank }, (_, i) => (
              <li key={'b' + i} />
            ))}
            {days.map((day) => {
              const isDone = done.has(`${y}-${pad2(m + 1)}-${pad2(day)}`)
              return (
                <li key={day}>
                  <span className={isDone ? s.done : undefined}>{day}</span>
                  {isDone && <span className="sr-only">학습함</span>}
                </li>
              )
            })}
          </ol>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
