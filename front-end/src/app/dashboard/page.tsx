'use client'

import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardStats } from '@/components/dashboard/stats'
import { TopPlayers } from '@/components/dashboard/top-players'
import { useSession } from 'next-auth/react'

export default function DashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="container mx-auto space-y-6 p-4">
      <DashboardHeader />
      {session && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardStats />
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>
      <div>
        <TopPlayers />
      </div>
    </div>
  )
}
