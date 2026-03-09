"use client"

import { useState } from "react"
import Image from "next/image"

export default function Base64ToImage() {
  const [base64Input, setBase64Input] = useState("")
  const [imageSrc, setImageSrc] = useState("")
  const [error, setError] = useState("")

  const handleConvert = () => {
    const value = base64Input.trim()

    if (!value) {
      setImageSrc("")
      setError("Please paste a Base64 data URL.")
      return
    }

    setError("")

    if (value.startsWith("data:image/")) {
      setImageSrc(value)
      return
    }

    // Support raw Base64 strings by assuming PNG.
    setImageSrc(`data:image/png;base64,${value}`)
  }

  const clearAll = () => {
    setBase64Input("")
    setImageSrc("")
    setError("")
  }

   const downloadImage = () => {
    if (!imageSrc) return
    const link = document.createElement("a")
    link.href = imageSrc
    link.download = "decoded-image.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="pro-card pro-fade-in rounded-2xl p-5 sm:p-6" style={{ animationDelay: "120ms" }}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Base64 to Image</h2>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
          Decoder
        </span>
      </div>

      <textarea
        value={base64Input}
        onChange={(e) => setBase64Input(e.target.value)}
        placeholder="Paste Base64 image string or full data URL here..."
        className="h-40 w-full rounded-lg border border-[var(--border)] bg-white/90 p-3 text-sm focus:outline-none"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleConvert}
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--accent-strong)]"
        >
          Convert
        </button>
        <button
          type="button"
          onClick={clearAll}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={downloadImage}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
        >
          Download
        </button>
      </div>

      {error && <p className="mt-2 text-red-600">{error}</p>}

      {imageSrc && (
        <div className="mt-4 rounded-xl border border-[var(--border)] bg-white/80 p-3">
          <Image
            src={imageSrc}
            alt="Decoded from Base64"
            className="mx-auto max-h-80 w-auto rounded-md"
            width={500}
            height={500}
          />
        </div>
      )}
    </section>
  )
}
