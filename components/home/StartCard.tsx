import Link from 'next/link'
import s from './StartCard.module.css'

// 오늘 나의 학습 시작 카드
export default function StartCard({ left }: { left: number }) {
  return (
    <Link href="/learn" className={s.card}>
      <p className={s.title}>오늘 나의 학습</p>
      <p className={'pixel ' + s.start}>&gt;START</p>
      <p className={s.left}>{left}개 학습 남음</p>
    </Link>
  )
}
