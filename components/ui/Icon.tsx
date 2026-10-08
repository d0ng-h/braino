// 피그마에서 SF Symbols 글자로 들어간 아이콘. 웹에는 그 폰트가 없어서 svg로 그림
type Props = { className?: string }

// 알림 종 (bell)
export function BellIcon({ className }: Props) {
  return (
    <svg className={className} width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden>
      <path
        d="M10 1v1.6M10 2.6c-3.4 0-5.6 2.6-5.6 6v3.5c0 1.2-.5 2.2-1.3 3.1l-1.3 1.3h16.4l-1.3-1.3c-.8-.9-1.3-1.9-1.3-3.1V8.6c0-3.4-2.2-6-5.6-6zM7.6 16.5c0 1.6 1 2.9 2.4 2.9s2.4-1.3 2.4-2.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 보내기 종이비행기 (paperplane)
export function SendIcon({ className }: Props) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M20.2 1.8 2.2 8.9c-.6.2-.6 1 0 1.2l6.9 2.8 2.8 6.9c.2.6 1 .6 1.2 0l7.1-18zM9.1 12.9 20.2 1.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
