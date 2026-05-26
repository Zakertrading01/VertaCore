'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

interface ImageUploaderProps {
  images: string[]
  onChange: (images: string[]) => void
  folder?: string
  maxImages?: number
}

export function ImageUploader({ images, onChange, folder = 'catalogue', maxImages = 5 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    if (images.length >= maxImages) {
      setError(`Maximum ${maxImages} images allowed.`)
      return
    }

    setUploading(true)
    setError(null)

    const toUpload = Array.from(files).slice(0, maxImages - images.length)
    const uploaded: string[] = []

    for (const file of toUpload) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? 'Upload failed.')
        break
      }

      const data = await res.json()
      uploaded.push(data.publicUrl)
    }

    onChange([...images, ...uploaded])
    setUploading(false)
  }

  function remove(url: string) {
    onChange(images.filter((u) => u !== url))
  }

  return (
    <div className="space-y-3">
      {/* Thumbnails */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={url} className="relative group w-24 h-24 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50">
              <Image src={url} alt={`Image ${i + 1}`} fill className="object-cover" sizes="96px" />
              {i === 0 && (
                <span className="absolute top-1 left-1 text-[9px] font-bold bg-gold text-navy px-1 py-0.5 rounded uppercase">Main</span>
              )}
              <button
                type="button"
                onClick={() => remove(url)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload area */}
      {images.length < maxImages && (
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-neutral-300 rounded-lg text-sm text-neutral-500 hover:border-gold hover:text-gold transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Uploading…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                Upload image{images.length === 0 ? '' : ' (first = main)'}
              </>
            )}
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
      <p className="text-xs text-neutral-400">JPG, PNG, WebP · max 10 MB · {images.length}/{maxImages}</p>
    </div>
  )
}
