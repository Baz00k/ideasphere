export default function EmailConfirmedPage() {
  return (
    // Email confirmation success page
    <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">IdeaSphere</h1>
        <p className="text-center text-2xl text-zinc-200">Email confirmed!</p>
        <p className="text-center text-2xl text-zinc-200">You can now log in in the app.</p>
      </div>
    </main>
  )
}
