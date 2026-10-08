import Link from 'next/link'
import Asset from '../ui/Asset'
import s from './CalendarCard.module.css'

// 학습 달력 보기 카드
export default function CalendarCard() {
  return (
    <Link href="/calendar" className={s.card}>
      <p className={s.title}>학습 달력 보기</p>
      <Asset src="/images/icon-calendar.png" alt="" fallback="📅" width={58} height={66} className={s.icon} />
    </Link>
  )
}
