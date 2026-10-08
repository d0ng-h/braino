'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TODAY, finishMission } from '../../../lib/missions'
import Mission from '../../../components/learn/Mission'
import Button from '../../../components/ui/Button'
import m from '../../../components/learn/Mission.module.css'
import s from './defend.module.css'

const MAX = 100

// 피그마에 아직 화면이 없어서 다른 학습 화면 부품으로 만듦
export default function DefendPage() {
  const router = useRouter()
  const [text, setText] = useState('')
  const [saving, setSaving] = useState(false)

  async function submit() {
    setSaving(true)
    await finishMission('defend')
    router.push('/learn')
  }

  return (
    <Mission title="반대편 변호하기" desc="아래 주장에 반대하는 입장이 되어 변호해 보세요">
      <div className={`${m.greenCard} ${s.card}`}>&lt;{TODAY.defend.claim}&gt;</div>
      <div className={`${m.box} ${s.box}`}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={MAX}
          placeholder="내용을 입력해주세요"
          aria-label="변호 내용"
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
