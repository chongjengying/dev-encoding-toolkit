"use client";

import ImageToBase64 from "./component/ImageToBase64";
import Base64ToImage from "./component/Base64ToImage";
import FileInformation from "./component/FileInformation";
import type { FileMeta } from "./component/FileInformation";
import { useState } from "react";

export default function Home() {
  const [fileMeta, setFileMeta] = useState<FileMeta | null>(null)
  const [uploadedImage, setUploadedImage] = useState("")

  return (
    <div className="pro-shell min-h-screen px-4 py-10 sm:px-8">
      <main className="relative mx-auto max-w-6xl">
        <header className="pro-fade-in mb-8 rounded-2xl border border-[var(--border)] bg-white/75 p-6 backdrop-blur-sm sm:p-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
            Developer Toolkit
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
            Base64 Image Studio
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Convert images to Base64 and decode Base64 back to images in one place.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ImageToBase64 onFileMetaChange={setFileMeta} onImageChange={setUploadedImage} />
          <Base64ToImage />
          <FileInformation fileMeta={fileMeta} imageSrc={uploadedImage} />
        </section>
      </main>
    </div>
  );
}
