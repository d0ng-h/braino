import TopBar from '../ui/TopBar'
import s from './Mission.module.css'

type Props = {
  title: string
  desc: React.ReactNode
  children: React.ReactNode
}

// 학습 화면 공통 틀 (상단바, 큰 제목, 설명)
export default function Mission({ title, desc, children }: Props) {
  return (
    <main className={s.page}>
      <TopBar back="/learn" />
      <h1 className={s.title}>{title}</h1>
      <p className={s.desc}>{desc}</p>
      {children}
    </main>
  )
}
