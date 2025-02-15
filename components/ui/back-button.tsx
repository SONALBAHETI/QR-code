"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "./button"

export function BackButton() {
  const router = useRouter()

  return (
    <Button variant="ghost" size="icon" onClick={() => router.back()}>
      <ArrowLeft className="h-6 w-6" />
    </Button>
  )
}

