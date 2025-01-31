"use client"

import { useState } from "react"
import Image from "next/image"

interface ImageModalProps {
  imageUrl: string
  altText: string
  title: string
  description: string
}

export default function ImageModal({ imageUrl, altText, title, description }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
      >
        Ver imagen
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-2xl p-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="flex flex-col items-center space-y-4 mt-4">
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image src={imageUrl || "/placeholder.svg"} alt={altText} fill style={{ objectFit: "contain" }} />
              </div>
              <p className="text-center text-gray-600">{description}</p>
              <div className="flex w-full max-w-md gap-2">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Search</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

