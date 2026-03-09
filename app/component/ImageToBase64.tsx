"use client"

import { useRef, useState } from "react"
import type { FileMeta } from "./FileInformation"

type ImageToBase64Props = {
  onFileMetaChange?: (meta: FileMeta | null) => void
  onImageChange?: (src: string) => void
}

export default function ImageToBase64({ onFileMetaChange, onImageChange }: ImageToBase64Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [base64, setBase64] = useState("")
  const [fileName, setFileName] = useState("")
  const [copied, setCopied] = useState(false)

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    const reader = new FileReader()

    reader.onload = () => {
      const result = reader.result as string
      setBase64(result)
      setCopied(false)
      onImageChange?.(result)

      const image = new Image()
      image.onload = () => {
        onFileMetaChange?.({
          name: file.name,
          type: file.type,
          sizeKB: Math.round(file.size / 1024),
          width: image.width,
          height: image.height,
          lastModified: new Date(file.lastModified).toLocaleString(),
        })
      }
      image.src = result
    }

    reader.readAsDataURL(file)
  }

  const handleCopy = async () => {
    if (!base64) return
    await navigator.clipboard.writeText(base64)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  const clearAll = () => {
    setBase64("")
    setFileName("")
    setCopied(false)
    onImageChange?.("")
    onFileMetaChange?.(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <section className="pro-card pro-fade-in rounded-2xl p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Image to Base64</h2>
        <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">
          Encoder
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: "none" }}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="mb-3 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--accent-strong)]"
      >
        Upload Image
      </button>

      {fileName && <p className="mb-3 text-sm text-slate-600">Selected: {fileName}</p>}

      <textarea
        value={base64}
        readOnly
        className="h-52 w-full rounded-lg border border-[var(--border)] bg-white/90 p-3 text-sm focus:outline-none"
        placeholder="Encoded Base64 will appear here..."
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCopy}
          disabled={!base64}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copied ? "Copied" : "Copy Base64"}
        </button>
        <button
          type="button"
          onClick={clearAll}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
        >
          Clear
        </button>
      </div>
    </section>
  )
}
