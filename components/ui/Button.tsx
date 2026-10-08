import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  bright?: boolean // 밝은 초록 (학습 화면 제출하기 버튼)
}

// 초록 큰 버튼. 모양은 braino.css 의 .b-btn
export default function Button({ bright, className, type = 'button', ...props }: Props) {
  const cls = ['b-btn', bright && 'bright', className].filter(Boolean).join(' ')
  return <button type={type} className={cls} {...props} />
}
