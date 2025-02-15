"use client"

import { useSearchParams } from "next/navigation"

export default function ProductViewClient() {
  const searchParams = useSearchParams()
  const productName = searchParams.get("name")

  if (!productName) {
    return <div className="text-center text-red-500">Product information is missing</div>
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">{productName}</h1>
    </div>
  )
}

