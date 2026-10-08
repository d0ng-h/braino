'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TODAY, finishMission } from '../../../lib/missions'
import Mission from '../../../components/learn/Mission'
import Button from '../../../components/ui/Button'
import m from '../../../components/learn/Mission.module.css'
import s from './write.module.css'

const MAX = 100

export default function WritePage() {
  const router = useRouter()
  const [text, setText] = useState('')
  const [saving, setSaving] = useState(false)

  async function submit() {
    setSaving(true)
    await finishMission('write')
    router.push('/learn')
  }

  return (
    <Mission
      title="글쓰기"
      desc={
        <>
          아래 주제로 한 문단의 짧은 글을 자유롭게 써 보세요!
          <br />
          떠오르는 대로 편하게 써도 좋아요.
        </>
      }
    >
      <p className={s.topic}>&lt;{TODAY.write.topic}&gt;</p>
      <div className={m.box}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={MAX}
          placeholder="내용을 입력해주세요"
          aria-label="글쓰기 내용"
        />
        <p className={m.count}>
          {text.length}/{MAX}
        </p>
      </div>
      <div className={m.bottom}>
        <Button bright onClick={submit} disabled={!text.trim() || saving}>
          제출하기
        </Button>
      </div>
    </Mission>
  )
}
