import NextAuth, { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const users = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  },
]

const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const result = userSchema.safeParse(credentials)

          if (!result.success) {
            return null
          }

          const { email, password } = result.data
          const user = users.find((user) => user.email === email)

          if (!user) {
            return null
          }

          const passwordMatch = users.find((user) => user.password === password)

          if (!passwordMatch) {
            return null
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
