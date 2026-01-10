import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#0f172a] text-[#fbbf24]">
      <h1 className="text-9xl font-bold tracking-widest text-[#7e22ce] opacity-50">404</h1>
      <div className="bg-[#fbbf24] px-2 text-sm rounded rotate-12 absolute">
        Star Not Found
      </div>
      <p className="mt-5 text-xl text-gray-300">
        The celestial body you are looking for has drifted into the void.
      </p>
      <Link href="/" className="mt-8 px-6 py-3 border border-[#fbbf24] text-[#fbbf24] hover:bg-[#fbbf24] hover:text-[#0f172a] transition-all rounded-full uppercase tracking-wider font-semibold">
        Return to the Galaxy
      </Link>
    </div>
  )
}
