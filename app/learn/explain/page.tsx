'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TODAY, finishMission } from '../../../lib/missions'
import Mission from '../../../components/learn/Mission'
import { SendIcon } from '../../../components/ui/Icon'
import m from '../../../components/learn/Mission.module.css'
import s from './explain.module.css'

export default function ExplainPage() {
  const router = useRouter()
  const [text, setText] = useState('')
  const [saving, setSaving] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim() || saving) return
    setSaving(true)
    await finishMission('explain')
    router.push('/learn')
  }

  return (
    <Mission title="설명하기" desc="천천히 읽고 이해해 보세요">
      <div className={`${m.greenCard} ${s.card}`}>
        <p className={s.word}>“ {TODAY.explain.word} ”</p>
        <p className={s.text}>{TODAY.explain.text}</p>
      </div>
      <form className={s.input} onSubmit={submit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="내 말로 정리하기..."
          aria-label="내 말로 정리하기"
        />
        <button type="submit" disabled={!text.trim() || saving} aria-label="보내기">
          <SendIcon />
        </button>
      </form>
    </Mission>
  )
}
