'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MISSIONS } from '../../lib/missions'
import TopBar from '../../components/ui/TopBar'
import Asset from '../../components/ui/Asset'
import BottomNav from '../../components/BottomNav'
import s from './learn.module.css'

const CARD = 280 // 카드 260 + 간격 20

export default function LearnPage() {
  const router = useRouter()
  const list = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // 가운데 온 카드 찾기
  function onScroll() {
    const el = list.current
    if (el) setActive(Math.round(el.scrollLeft / CARD))
  }

  function go(i: number) {
    list.current?.scrollTo({ left: i * CARD, behavior: 'smooth' })
  }

  return (
    <main className={s.page}>
      <TopBar bell />
      <h1 className={s.title}>오늘 나의 학습</h1>
      <p className={s.sub}>총 {MISSIONS.length}개의 학습이 있어요 !</p>

      <div className={s.list} ref={list} onScroll={onScroll}>
        {MISSIONS.map((m, i) => (
          <button
            key={m.id}
            type="button"
            className={i === active ? `${s.card} ${s.on}` : s.card}
            onClick={() => (i === active ? router.push(`/learn/${m.id}`) : go(i))}
            aria-label={`${m.name} 시작하기`}
          >
            <span className={'pixel ' + s.logo}>BRAINO</span>
            <span className={s.art}>
              <Asset
                src={m.card}
                alt=""
                width={1024}
                height={1024}
                sizes="324px"
                className={s.sprite}
                style={{ left: `${-m.spot[0] * 100}%`, top: `${-m.spot[1] * 100}%` }}
              />
            </span>
          </button>
        ))}
      </div>

      <div className={s.dots}>
        {MISSIONS.map((m, i) => (
          <button
            key={m.id}
            type="button"
            className={i === active ? `${s.dot} ${s.dotOn}` : s.dot}
            onClick={() => go(i)}
            aria-label={`${i + 1}번째 학습`}
          >
            <Asset src="/images/dot.svg" alt="" width={8} height={8} />
          </button>
        ))}
      </div>
      <BottomNav />
    </main>
  )
}
