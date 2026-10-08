import Asset from '../ui/Asset'
import { pad2 } from '../../lib/game'
import s from './CharacterStatus.module.css'

type Props = {
  name: string
  hearts: number // 0~3
  level: number
  xpRate: number // 0~1
}

// 캐릭터 이름, 하트, 레벨, 경험치 바
export default function CharacterStatus({ name, hearts, level, xpRate }: Props) {
  return (
    <section className={s.wrap}>
      <div className={s.row}>
        <p className={'pixel ' + s.name}>{name}</p>
        <div className={s.hearts} role="img" aria-label={`하트 ${hearts}개`}>
          {[0, 1, 2].map((i) => (
            <Asset
              key={i}
              src="/images/heart.png"
              alt=""
              fallback="❤️"
              width={28}
              height={28}
              className={i < hearts ? s.heart : `${s.heart} ${s.lost}`}
            />
          ))}
        </div>
        <p className={'pixel ' + s.level}>LV.{pad2(level)}</p>
      </div>
      <div
        className={s.bar}
        role="progressbar"
        aria-label="경험치"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(xpRate * 100)}
      >
        <div className={s.fill} style={{ width: `${xpRate * 100}%` }} />
      </div>
    </section>
  )
}
