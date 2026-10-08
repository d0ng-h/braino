'use client'

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'

type Props = Omit<ImageProps, 'onError'> & {
  fallback?: string // 이미지 깨졌을때 대신 보여줄 글자 (이모지)
}

// 이미지. 파일이 없거나 깨지면 fallback 으로 대신 보여줌
export default function Asset({ fallback = '', alt, className, ...props }: Props) {
  const [broken, setBroken] = useState(false)

  if (broken) {
    return alt ? (
      <span className={className} role="img" aria-label={alt}>
        {fallback}
      </span>
    ) : (
      <span className={className} aria-hidden>
        {fallback}
      </span>
    )
  }
  return <Image alt={alt} className={className} onError={() => setBroken(true)} {...props} />
}
