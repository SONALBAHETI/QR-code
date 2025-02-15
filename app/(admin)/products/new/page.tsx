"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function NewProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    agentPrice: "",
    category: "",
    description: "",
  })
  const [image, setImage] = useState<string | null>(null)
  const [showQR, setShowQR] = useState(false)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Product name is required",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/generate-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productName: formData.name }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate QR code")
      }

      const data = await response.json()
      setQrCodeDataUrl(data.qrCodeDataUrl)
      setShowQR(true)

      toast({
        title: "Success",
        description: "QR Code generated successfully",
      })
    } catch (error) {
      console.error("Error generating QR code:", error)
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/products">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-[#e3e3e3]"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="bg-[#e3e3e3]"
              required
            />
          </div>
          <div>
            <Label htmlFor="agentPrice">Agent Price %</Label>
            <Input
              id="agentPrice"
              name="agentPrice"
              type="number"
              value={formData.agentPrice}
              onChange={handleChange}
              className="bg-[#e3e3e3]"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="bg-[#e3e3e3]"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="h-32 bg-[#e3e3e3]"
          />
        </div>

        <div>
          <Label htmlFor="image">Product Image</Label>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-[#e3e3e3]"
            required
          />
        </div>

        {image && (
          <div className="mt-4">
            <img src={image || "/placeholder.svg"} alt="Product preview" className="max-w-full h-auto rounded-lg" />
          </div>
        )}

        <Button type="submit" className="w-full bg-[#383535] hover:bg-[#383535]/90 text-white" disabled={isLoading}>
          {isLoading ? "Generating QR Code..." : "Add Product and Generate QR Code"}
        </Button>
      </form>

      {showQR && (
        <Card className="mt-8 p-6">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold">Product QR Code</h2>
            <div className="bg-white p-4 rounded-lg">
              <img src={qrCodeDataUrl || "/placeholder.svg"} alt="Product QR Code" className="max-w-full h-auto" />
            </div>
            <p className="text-sm text-gray-500 text-center">Scan this QR code to view product details</p>
          </div>
        </Card>
      )}
    </div>
  )
}

