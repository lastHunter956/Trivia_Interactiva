import { Button } from '@/components/ui/button'
import { Trophy, Crown } from 'lucide-react'

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido de vuelta, aquí están tus estadísticas</p>
      </div>
    </div>
  )
}
