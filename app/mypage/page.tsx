'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { useHomeData } from '../../lib/useHomeData'
import { pad2 } from '../../lib/game'
import TopBar from '../../components/ui/TopBar'
import Asset from '../../components/ui/Asset'
import BottomNav from '../../components/BottomNav'
import s from './mypage.module.css'

export default function MyPage() {
  const router = useRouter()
  const d = useHomeData()
  if (!d) return <main className={s.page} />

  async function logout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const stats = [
    { label: '오늘 남은 학습', value: d.left, unit: '개' },
    { label: '이번달 누적 출석', value: d.monthDays, unit: '일' },
    { label: '최대 연속 학습', value: d.maxStreak, unit: '일' },
  ]

  return (
    <main className={s.page}>
      <TopBar />
      <div className={s.body}>
        <section className={s.profile}>
          <Asset src="/images/avatar.svg" alt="" width={60} height={60} />
          <div className={s.who}>
            <h1 className={s.name}>
              <span className={"pixel " + s.charName}>{d.charName}</span>님
            </h1>
            <p className={s.id}>ID : {d.username}</p>
          </div>
          <button type="button" className={s.logout} onClick={logout}>
            &gt; 로그아웃
          </button>
        </section>

        <section className={s.level}>
          <p className={s.lv}>LEVEL. {pad2(d.level)}</p>
          <div
            className={s.bar}
            role="progressbar"
            aria-label="경험치"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(d.xpRate * 100)}
          >
            <div className={s.fill} style={{ width: `${d.xpRate * 100}%` }} />
          </div>
          <p className={s.tip}>브레이노를 통해서 당신의 뇌 레벨을 높여보세요!</p>
        </section>

        <section className={s.stats}>
          {stats.map((st) => (
            <div key={st.label} className={s.stat}>
              <p className={s.statLabel}>{st.label}</p>
              <p className={s.statValue}>
                {st.value}
                <small>{st.unit}</small>
              </p>
            </div>
          ))}
          <Asset src="/images/divider.svg" alt="" width={1} height={68} className={`${s.divider} ${s.d1}`} />
          <Asset src="/images/divider.svg" alt="" width={1} height={68} className={`${s.divider} ${s.d2}`} />
        </section>

        <section className={s.streak}>
          <Asset src="/images/fire.png" alt="" fallback="🔥" width={104} height={104} className={s.fire} />
          <div className={s.streakText}>
            <div className={s.streakRow}>
              <p className={s.streakNum}>{d.streak}</p>
              <p className={s.streakLabel}>
                {d.charName}님은
                <br />
                일 연속 학습 중!
              </p>
            </div>
            <p className={s.cheer}>조금만 더 힘내볼까요? 브레이노가 함께할게요!</p>
          </div>
        </section>

        <Link href="/learn" className={s.startCard}>
          <p className={s.cardTitle}>오늘 나의 학습</p>
          <p className={'pixel ' + s.start}>&gt;START</p>
        </Link>
        <Link href="/calendar" className={s.calCard}>
          학습 달력 보기
        </Link>
      </div>
      <BottomNav />
    </main>
  )
}
