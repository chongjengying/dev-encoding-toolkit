"use client"

import Image from "next/image"

export type FileMeta = {
  name: string
  type: string
  sizeKB: number
  width: number
  height: number
  lastModified: string
}

type FileInformationProps = {
  fileMeta: FileMeta | null
  imageSrc?: string
}

export default function FileInformation({ fileMeta, imageSrc }: FileInformationProps) {
  return (
    <section className="pro-card pro-fade-in rounded-2xl p-5 sm:p-6" style={{ animationDelay: "240ms" }}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">File Information</h2>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800">
          Utility
        </span>
      </div>

      {!fileMeta && (
        <p className="text-sm text-slate-600">
          Upload an image in the Image to Base64 card to see file details.
        </p>
      )}

      {fileMeta && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 items-start">
          <div className="space-y-2 text-sm text-slate-700">
            <p><strong>Name:</strong> {fileMeta.name}</p>
            <p><strong>Type:</strong> {fileMeta.type || "Unknown"}</p>
            <p><strong>Size:</strong> {fileMeta.sizeKB} KB</p>
            <p><strong>Resolution:</strong> {fileMeta.width} x {fileMeta.height}</p>
            <p><strong>Last Modified:</strong> {fileMeta.lastModified}</p>
          </div>
          {imageSrc && (
            <div className="flex justify-center sm:justify-end">
              <div className="rounded-lg border border-[var(--border)] bg-white/80 p-2">
                <Image
                  src={imageSrc}
                  alt="Preview"
                  className="max-h-48 w-auto rounded-md"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
