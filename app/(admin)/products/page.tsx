"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Product {
  id: string
  name: string
  price: string
  image: string
  qrCode: string
}

export default function Products() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  useEffect(() => {
    // In a real application, you would fetch products from local storage or a state management solution
    // For now, we'll use dummy data
    const dummyProducts = [
      { id: "1", name: "Product 1", price: "100", image: "/placeholder.svg?height=200&width=200" },
      { id: "2", name: "Product 2", price: "200", image: "/placeholder.svg?height=200&width=200" },
      { id: "3", name: "Product 3", price: "300", image: "/placeholder.svg?height=200&width=200" },
    ]
    setProducts(dummyProducts)
  }, [])

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
  }

  const handleSaveEdit = () => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)))
      setEditingProduct(null)
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Products</h1>
        </div>
        <Button asChild className="bg-[#b72727] hover:bg-[#b72727]/90 text-white">
          <Link href="/products/new">Add New</Link>
        </Button>
      </div>

      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search"
          className="bg-[#e3e3e3]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="space-y-2">
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm">Rs. {product.price}/sqft</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#383535] text-[#383535] hover:bg-[#383535] hover:text-white"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                  </DialogHeader>
                  {editingProduct && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="edit-name">Name</Label>
                        <Input
                          id="edit-name"
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          className="bg-[#e3e3e3]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-price">Price</Label>
                        <Input
                          id="edit-price"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                          className="bg-[#e3e3e3]"
                        />
                      </div>
                      <div>
                        <Label>QR Code</Label>
                        <img
                          src={editingProduct.qrCode || "/placeholder.svg"}
                          alt="Product QR Code"
                          className="mt-2 w-full"
                        />
                      </div>
                      <Button onClick={handleSaveEdit} className="bg-[#383535] hover:bg-[#383535]/90 text-white">
                        Save Changes
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

