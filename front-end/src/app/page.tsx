import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="container px-4 py-12 md:py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none">
                ¡Bienvenido/a a la prueba de trivia definitiva!
              </h1>
              <p className="max-w-[600px] text-gray-400 md:text-xl">
                Esta plataforma te permite{' '}
                <Link href="/register" className="text-blue-500 hover:underline">
                  registrarte
                </Link>
                , elegir la{' '}
                <Link href="/categories" className="text-blue-500 hover:underline">
                  categoría
                </Link>{' '}
                que más te guste y responder preguntas de opción múltiple para acumular puntos.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg" className="w-full min-[400px]:w-auto">
                  Comenzar Ahora
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                  Ver Ranking
                </Button>
              </Link>
            </div>
          </div>
          <div className="mx-auto flex flex-col justify-center space-y-4 rounded-lg bg-slate-950 p-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">¿Estás listo/a para el reto?</h2>
              <p className="text-gray-400">
                Crea tu cuenta, explora nuestras categorías y demuestra quién sabe más.
              </p>
            </div>
            <p className="text-gray-400">
              Únete a la competencia y descubre en cada partida nuevas preguntas, nuevos retos y la
              oportunidad de convertirte en el líder indiscutible de la clasificación. ¡Que comience
              la trivia!
            </p>
            <Button className="w-full">Buscar</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
