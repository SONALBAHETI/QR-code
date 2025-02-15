"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initialAgents = [
  {
    id: "1",
    name: "John Doe",
    position: "Senior Agent",
    commission: "10",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jane Smith",
    position: "Junior Agent",
    commission: "8",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Bob Johnson",
    position: "Mid-level Agent",
    commission: "9",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function Agents() {
  const router = useRouter()
  const [agents, setAgents] = useState(initialAgents)
  const [bulkPrice, setBulkPrice] = useState("")
  const [editingAgent, setEditingAgent] = useState<(typeof initialAgents)[0] | null>(null)

  const handleBulkUpdate = () => {
    setAgents(agents.map((agent) => ({ ...agent, commission: bulkPrice })))
    alert(`Updated bulk price to ${bulkPrice}%`)
  }

  const handleEdit = (agent: (typeof initialAgents)[0]) => {
    setEditingAgent(agent)
  }

  const handleSaveEdit = () => {
    if (editingAgent) {
      setAgents(agents.map((a) => (a.id === editingAgent.id ? editingAgent : a)))
      setEditingAgent(null)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">All Agents</h1>
        </div>
        <Button asChild className="bg-[#b72727] hover:bg-[#b72727]/90 text-white">
          <Link href="/agents/new">Add New Agent</Link>
        </Button>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full bg-[#000000] text-white hover:bg-[#000000]/90 mb-6">
            Change Bulk Pricing
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Bulk Pricing</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Current Price %</Label>
              <Input type="number" className="bg-[#e3e3e3]" disabled value="10" />
            </div>
            <div>
              <Label>New Price %</Label>
              <Input
                type="number"
                className="bg-[#e3e3e3]"
                value={bulkPrice}
                onChange={(e) => setBulkPrice(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Button className="flex-1 bg-[#383535] hover:bg-[#383535]/90 text-white" onClick={handleBulkUpdate}>
                Change for All
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setBulkPrice("")}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {agents.map((agent) => (
          <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Image src={agent.image} alt={agent.name} width={40} height={40} className="rounded-full" />
              <div>
                <h3 className="font-semibold">{agent.name}</h3>
                <p className="text-sm text-gray-500">{agent.position}</p>
                <p className="text-sm text-gray-500">Commission: {agent.commission}%</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#383535] text-[#383535] hover:bg-[#383535] hover:text-white"
                  onClick={() => handleEdit(agent)}
                >
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Agent</DialogTitle>
                </DialogHeader>
                {editingAgent && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-name">Name</Label>
                      <Input
                        id="edit-name"
                        value={editingAgent.name}
                        onChange={(e) => setEditingAgent({ ...editingAgent, name: e.target.value })}
                        className="bg-[#e3e3e3]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-position">Position</Label>
                      <Input
                        id="edit-position"
                        value={editingAgent.position}
                        onChange={(e) => setEditingAgent({ ...editingAgent, position: e.target.value })}
                        className="bg-[#e3e3e3]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-commission">Commission %</Label>
                      <Input
                        id="edit-commission"
                        value={editingAgent.commission}
                        onChange={(e) => setEditingAgent({ ...editingAgent, commission: e.target.value })}
                        className="bg-[#e3e3e3]"
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
        ))}
      </div>
    </div>
  )
}

