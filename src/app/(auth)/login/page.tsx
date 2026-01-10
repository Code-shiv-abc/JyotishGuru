'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Successfully logged in')
      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error) {
      toast.error('Error logging in with Google')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#fbbf24]">Welcome Back</h2>
          <p className="mt-2 text-sm text-slate-400">Sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#7e22ce] focus:border-transparent sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#7e22ce] focus:border-transparent sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7e22ce] hover:bg-[#6b21a8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7e22ce] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />}
              Sign in
            </button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-900/50 text-slate-500">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center px-4 py-2 border border-slate-700 rounded-md shadow-sm text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7e22ce] transition-colors"
        >
          <svg className="h-5 w-5 mr-2" aria-hidden="true" viewBox="0 0 24 24">
            <path
              d="M12.0003 20.45C16.6346 20.45 20.5283 17.2917 21.9442 13.0917H12.0003V9.75833H23.5083C23.6846 10.375 23.7846 11.0333 23.7846 11.725C23.7846 18.2 19.4623 22.8 12.0003 22.8C6.03457 22.8 1.20029 17.9657 1.20029 12C1.20029 6.03433 6.03457 1.2 12.0003 1.2C14.9163 1.2 17.3828 2.26667 19.2626 4.025L16.7443 6.54333C15.8234 5.68333 14.3312 4.75833 12.0003 4.75833C8.07727 4.75833 4.87229 7.96333 4.87229 11.8917C4.87229 15.82 8.07727 19.025 12.0003 19.025C15.9348 19.025 18.2541 16.325 18.7296 12.9833H12.0003V20.45Z"
              fill="currentColor"
            />
          </svg>
          Google
        </button>
      </div>
    </div>
  )
}
