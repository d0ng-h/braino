import Asset from '../ui/Asset'
import type { DayState } from '../../lib/useHomeData'
import s from './StreakCard.module.css'

const DAYS = ['월', '화', '수', '목', '금', '토', '일']

const CIRCLE: Record<DayState, string> = {
  done: '/images/day-done.svg',
  miss: '/images/day-miss.svg',
  today: '/images/day-future.svg',
  future: '/images/day-future.svg',
}

const STATE_NAME: Record<DayState, string> = {
  done: '학습함',
  miss: '빠짐',
  today: '오늘',
  future: '아직',
}

// 연속 학습 카드 (불꽃, 연속 일수, 이번주 기록)
export default function StreakCard({ streak, week }: { streak: number; week: DayState[] }) {
  return (
    <section className={s.card}>
      <div className={s.visual}>
        <Asset src="/images/fire-glow.svg" alt="" width={117} height={110} className={s.glow} />
        <Asset src="/images/fire.png" alt="" fallback="🔥" width={106} height={106} className={s.fire} />
      </div>
      <p className={s.num}>{streak}</p>
      <p className={s.label}>일 연속 학습 중!</p>
      <ul className={s.week}>
        {week.map((st, i) => (
          <li key={DAYS[i]} className={st === 'miss' ? `${s.day} ${s.miss}` : s.day}>
            <span className={s.circle}>
              <Asset src={CIRCLE[st]} alt="" width={14} height={14} />
              {st === 'done' && <Asset src="/images/icon-done.svg" alt="" width={11} height={11} className={s.done} />}
              {st === 'miss' && <Asset src="/images/icon-close.svg" alt="" width={12} height={12} className={s.close} />}
            </span>
            <span aria-hidden>{DAYS[i]}</span>
            <span className="sr-only">
              {DAYS[i]}요일 {STATE_NAME[st]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
