import Link from 'next/link'
import Asset from './ui/Asset'
import s from './BottomNav.module.css'

// 아래 탭바 (랭킹 / 홈 / 마이페이지)
export default function BottomNav() {
  return (
    <nav className={s.nav} aria-label="메뉴">
      <div className={s.bar}>
        <Link href="/ranking" className={s.medal} aria-label="랭킹">
          <Asset src="/images/icon-medal.png" alt="" fallback="🏅" width={46} height={56} className={s.icon} />
        </Link>
        <Link href="/mypage" className={s.profile} aria-label="마이페이지">
          <Asset src="/images/icon-profile.png" alt="" fallback="👤" width={50} height={57} className={s.icon} />
        </Link>
      </div>
      <Link href="/home" className={s.home}>
        <Asset src="/images/home-circle.svg" alt="" width={160} height={160} className={s.circle} />
        <Asset src="/images/icon-home.png" alt="" fallback="🏠" width={81} height={92} className={s.homeIcon} />
        <span className={'pixel ' + s.homeText}>HOME</span>
      </Link>
    </nav>
  )
}
