'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TODAY, finishMission } from '../../../lib/missions'
import Mission from '../../../components/learn/Mission'
import Button from '../../../components/ui/Button'
import m from '../../../components/learn/Mission.module.css'
import s from './connect.module.css'

export default function ConnectPage() {
  const router = useRouter()
  const [words, setWords] = useState(['', '', ''])
  const [saving, setSaving] = useState(false)
  const [a, b] = TODAY.connect.words

  async function submit() {
    setSaving(true)
    await finishMission('connect')
    router.push('/learn')
  }

  return (
    <Mission title="개념연결" desc="두 단어 사이의 연결고리 3개를 찾아보세요">
      <p className={s.words}>
        <span>{a}</span>
        <small>and</small>
        <span>{b}</span>
      </p>
      {words.map((w, i) => (
        <input
          key={i}
          className={m.pill}
          value={w}
          onChange={(e) => setWords(words.map((x, j) => (j === i ? e.target.value : x)))}
          placeholder={`연결 고리 단어 ${i + 1}`}
        />
      ))}
      <div className={m.bottom}>
        <Button bright onClick={submit} disabled={words.some((w) => !w.trim()) || saving}>
          제출하기
        </Button>
      </div>
    </Mission>
  )
}
