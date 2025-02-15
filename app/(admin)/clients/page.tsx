"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initialClients = [
  { id: "1", name: "Alice Johnson", agent: "John Doe", purchases: 3 },
  { id: "2", name: "Bob Williams", agent: "Jane Smith", purchases: 2 },
  { id: "3", name: "Charlie Brown", agent: "Bob Johnson", purchases: 1 },
]

export default function Clients() {
  const [clients, setClients] = useState(initialClients)
  const [viewingClient, setViewingClient] = useState<(typeof initialClients)[0] | null>(null)

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">All Clients</h1>
      </div>

      <div className="space-y-4">
        {clients.map((client) => (
          <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">{client.name}</h3>
              <p className="text-sm text-gray-500">Agent: {client.agent}</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#383535] text-[#383535] hover:bg-[#383535] hover:text-white"
                  onClick={() => setViewingClient(client)}
                >
                  View
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Client Details</DialogTitle>
                </DialogHeader>
                {viewingClient && (
                  <div className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input value={viewingClient.name} disabled className="bg-[#e3e3e3]" />
                    </div>
                    <div>
                      <Label>Agent</Label>
                      <Input value={viewingClient.agent} disabled className="bg-[#e3e3e3]" />
                    </div>
                    <div>
                      <Label>Total Purchases</Label>
                      <Input value={viewingClient.purchases} disabled className="bg-[#e3e3e3]" />
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  )
}

