'use client'

import Link from 'next/link'
import Asset from './Asset'
import { BellIcon } from './Icon'
import s from './TopBar.module.css'

type Props = {
  back?: string // 뒤로가기 누르면 갈 주소
  dark?: boolean // 검정 아이콘 (홈 그림 위)
  bell?: boolean // 오른쪽 알림 버튼
  className?: string
}

// 화면 맨 위 (뒤로가기, BRAINO, 알림)
export default function TopBar({ back = '/home', dark, bell, className }: Props) {
  return (
    <header className={className ? `${s.bar} ${className}` : s.bar}>
      <Link href={back} className={`${s.round} ${s.left}`} aria-label="이전으로">
        <Asset src="/images/btn-circle.svg" alt="" width={40} height={40} className={s.circle} />
        <Asset
          src={dark ? '/images/arrow-black.svg' : '/images/arrow-green.svg'}
          alt=""
          width={10}
          height={18}
          className={s.arrow}
        />
      </Link>
      <p className={'pixel ' + s.title}>BRAINO</p>
      {bell && (
        <button
          type="button"
          className={`${s.round} ${s.right}`}
          onClick={() => alert('알림은 준비 중이에요')}
          aria-label="알림"
        >
          <Asset src="/images/btn-circle.svg" alt="" width={40} height={40} className={s.circle} />
          <BellIcon className={dark ? s.bell : `${s.bell} ${s.green}`} />
        </button>
      )}
    </header>
  )
}
