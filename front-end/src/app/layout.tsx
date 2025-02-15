import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/components/auth/AuthPriveder'
import { Navbar } from '@/components/ui/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'QuizMaster - Trivia Competitiva',
  description: 'Compite en trivia y demuestra tus conocimientos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`dark grid min-h-dvh grid-rows-[auto_1fr] antialiased`}>
        <AuthProvider>
          <header className="h-fit">
            <Navbar />
          </header>
          <main className="container mx-auto h-full max-w-screen-xl py-4">
            {children}
            <Toaster />
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
