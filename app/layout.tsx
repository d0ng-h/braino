import type { Metadata, Viewport } from 'next'
import { Fredoka, Press_Start_2P, Protest_Strike } from 'next/font/google'
import './globals.css'
import './braino.css'

// 픽셀 폰트 (BRAINO, RINO, LV, START, HOME)
const pixel = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
})

// 연속 학습 숫자 폰트 (12)
const number = Protest_Strike({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-number',
})

// 달력 화면 큰 숫자 폰트 (동글동글)
const round = Fredoka({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-round',
})

export const metadata: Metadata = {
  title: 'BRAINO',
  description: '하루 10분, AI 대신 내 뇌로 생각하기',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fbfaf3',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${pixel.variable} ${number.variable} ${round.variable}`}>
      <head>
        {/* 한글 기본 폰트 Pretendard */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <div className="app">{children}</div>
      </body>
    </html>
  )
}
