// import { Brain } from 'lucide-react'
// import Link from 'next/link'
// import { Button } from './button'
//
// export const Navbar = () => {
//   return (
//     <nav className="border-b">
//       <div className="container mx-auto flex h-16 items-center px-4">
//         <Link href="/" className="flex items-center space-x-2">
//           <Brain className="h-6 w-6" />
//           <span className="font-bold">Brain Quizz</span>
//         </Link>
//
//         <div className="ml-auto flex items-center space-x-4">
//           <Link href="/quiz">
//             <Button variant="ghost">Quiz</Button>
//           </Link>
//           <Link href="/register">
//             <Button>Registrarse</Button>
//           </Link>
//           <Link href="/login">
//             <Button variant="outline">Iniciar Sesión</Button>
//           </Link>
//         </div>
//       </div>
//
//     </nav>
//   )
// }
//
'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Brain } from 'lucide-react'

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Brain className="h-6 w-6" />
          <span className="font-bold">QuizMaster</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/quiz">
            <Button variant="ghost">Quiz</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">Ranking</Button>
          </Link>
          {session ? (
            <>
              <span className="text-sm text-muted-foreground">{session.user?.name}</span>
              <Button variant="ghost" onClick={() => signOut()}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Link href="/register">
                <Button>Registrarse</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline">Iniciar Sesión</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
// <nav className="w-full border-b">
//   <ul className="container mx-auto flex w-fit max-w-screen-xl gap-4 py-3 align-middle">
//     {children}
//   </ul>
// </nav>
