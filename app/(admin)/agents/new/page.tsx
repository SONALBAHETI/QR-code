"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function NewAgent() {
  const router = useRouter()
  const [image, setImage] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    alert("New agent added successfully!")
    router.push("/agents")
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/agents">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">New Agent</h1>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" className="bg-[#e3e3e3]" required />
        </div>

        <div>
          <Label htmlFor="commission">Commission Price %</Label>
          <Input id="commission" type="number" className="bg-[#e3e3e3]" required />
        </div>

        <div>
          <Label htmlFor="position">Position</Label>
          <Input id="position" className="bg-[#e3e3e3]" required />
        </div>

        <div>
          <Label>Add Image</Label>
          <div className="mt-2">
            {image ? (
              <div className="relative w-32 h-32">
                <img src={image} alt="Agent" className="w-full h-full object-cover rounded-lg" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="absolute top-0 right-0 bg-white"
                  onClick={() => setImage(null)}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                className="w-32 h-32 text-2xl"
                onClick={() => setImage("/placeholder.svg?height=128&width=128")}
              >
                +
              </Button>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1 bg-[#383535] hover:bg-[#383535]/90 text-white">
            Save
          </Button>
          <Button type="button" variant="outline" className="flex-1" onClick={() => router.push("/agents")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

