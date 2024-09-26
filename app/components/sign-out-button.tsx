'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { signOut } from '@/app/actions/auth'

export default function SignOutButton() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await signOut()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
    >
      Sign Out
    </button>
  )
}