import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const topPlayers = [
  {
    name: 'Carolina M.',
    points: 4850,
    avatar: '/placeholder.svg?height=32&width=32',
    position: 1,
  },
  {
    name: 'Alejandro R.',
    points: 4720,
    avatar: '/placeholder.svg?height=32&width=32',
    position: 2,
  },
  {
    name: 'María S.',
    points: 4680,
    avatar: '/placeholder.svg?height=32&width=32',
    position: 3,
  },
  {
    name: 'Daniel P.',
    points: 4590,
    avatar: '/placeholder.svg?height=32&width=32',
    position: 4,
  },
  {
    name: 'Laura G.',
    points: 4480,
    avatar: '/placeholder.svg?height=32&width=32',
    position: 5,
  },
]

export function TopPlayers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Jugadores</CardTitle>
        <CardDescription>Los mejores 5 jugadores de la semana</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPlayers.map((player) => (
            <div
              key={player.name}
              className="flex items-center justify-between space-x-4 rounded-md bg-gray-900 p-2"
            >
              <div className="flex items-center space-x-4">
                <span className="w-4 text-sm font-medium text-muted-foreground">
                  {player.position}
                </span>
                <Avatar className="size-8">
                  <AvatarImage src={player.avatar} />
                  <AvatarFallback>
                    {player.name.split(' ')[0][0]}
                    {player.name.split(' ')[1][0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{player.name}</p>
                </div>
              </div>
              <div className="font-bold">{player.points}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
