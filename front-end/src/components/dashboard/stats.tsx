import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Trophy, Target, Zap } from 'lucide-react'

const stats = [
  {
    title: 'Puntos Totales',
    value: '2,840',
    icon: Trophy,
    description: '+20 desde la última partida',
  },
  {
    title: 'Partidas Jugadas',
    value: '45',
    icon: Brain,
    description: 'En el último mes',
  },
  {
    title: 'Precisión',
    value: '89%',
    icon: Target,
    description: 'Respuestas correctas',
  },
  {
    title: 'Racha Actual',
    value: '5',
    icon: Zap,
    description: 'Días consecutivos',
  },
]

export function DashboardStats() {
  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
