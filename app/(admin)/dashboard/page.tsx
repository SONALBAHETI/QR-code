import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">HELLO,</h1>
        <h2 className="text-3xl">Mr. Ankit</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Link href="/products" className="block">
          <Card className="p-6 bg-[#383535] text-white hover:bg-[#383535]/90 transition-colors">
            <h3 className="text-xl font-semibold">All Products</h3>
          </Card>
        </Link>
        <Link href="/agents" className="block">
          <Card className="p-6 bg-[#383535] text-white hover:bg-[#383535]/90 transition-colors">
            <h3 className="text-xl font-semibold">All Agents</h3>
          </Card>
        </Link>
      </div>

      <div className="grid gap-4">
        <Button asChild className="w-full bg-[#b72727] hover:bg-[#b72727]/90 text-white h-14 text-lg">
          <Link href="/products/new">+ Add New Product</Link>
        </Button>

        <Button asChild variant="outline" className="w-full h-14 text-lg border-[#e3e3e3]">
          <Link href="/agents/new">+ Add New Agent</Link>
        </Button>

        <Button asChild className="w-full bg-[#383535] hover:bg-[#383535]/90 text-white h-14 text-lg mt-4">
          <Link href="/clients">Clients Data</Link>
        </Button>
      </div>
    </div>
  )
}

