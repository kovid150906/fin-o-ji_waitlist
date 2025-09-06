'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageWithFallbackProps {
  src: string
  fallbackSrc: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
}

export function ImageWithFallback({
  src,
  fallbackSrc,
  alt,
  className,
  fill,
  width,
  height,
  priority = false,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      className={cn(className)}
      fill={fill}
      width={width}
      height={height}
      priority={priority}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
    />
  )
}
