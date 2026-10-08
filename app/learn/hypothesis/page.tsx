'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TODAY, finishMission } from '../../../lib/missions'
import Mission from '../../../components/learn/Mission'
import Button from '../../../components/ui/Button'
import m from '../../../components/learn/Mission.module.css'
import s from './hypothesis.module.css'

// 마지막 학습이라 끝나면 메인 홈으로
export default function HypothesisPage() {
  const router = useRouter()
  const [ideas, setIdeas] = useState(['', '', ''])
  const [saving, setSaving] = useState(false)

  async function submit() {
    setSaving(true)
    await finishMission('hypothesis')
    router.push('/home')
  }

  return (
    <Mission title="가설세우기" desc="아래 제시된 현상에 대한 원인을 3가지 생각해보세요">
      <div className={`${m.greenCard} ${s.card}`}>
        <p>{TODAY.hypothesis.text}</p>
        <p>{TODAY.hypothesis.question}</p>
      </div>
      {ideas.map((w, i) => (
        <input
          key={i}
          className={m.pill}
          value={w}
          onChange={(e) => setIdeas(ideas.map((x, j) => (j === i ? e.target.value : x)))}
          placeholder={`원인 가설 ${i + 1}`}
        />
      ))}
      <div className={m.bottom}>
        <Button bright onClick={submit} disabled={ideas.some((w) => !w.trim()) || saving}>
          메인 홈으로
        </Button>
      </div>
    </Mission>
  )
}
