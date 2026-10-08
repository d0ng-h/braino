import TopBar from '../ui/TopBar'
import Asset from '../ui/Asset'
import { charImage } from '../../lib/game'
import s from './HomeHero.module.css'

// 홈 맨 위 (캐릭터 그림 + 상단바)
export default function HomeHero({ level }: { level: number }) {
  return (
    <section className={s.hero}>
      <Asset
        src={charImage(level)}
        alt="내 캐릭터"
        fallback="🥚"
        width={512}
        height={507}
        sizes="512px"
        preload
        className={s.bg}
      />
      <TopBar back="/" dark bell className={s.top} />
    </section>
  )
}
