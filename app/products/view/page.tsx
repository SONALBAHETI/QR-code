import { Suspense } from "react"
import ProductViewClient from "./ProductViewClient"

export default function ProductView() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ProductViewClient />
      </Suspense>
    </div>
  )
}

