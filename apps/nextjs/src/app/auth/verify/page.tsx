export default function EmailConfirmedPage() {
  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-b from-secondary to-primary text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-y-12 px-4 py-8">
        <h1 className="text-5xl font-bold sm:text-[5rem]">IdeaSphere</h1>
        <p className="text-center text-2xl text-zinc-200">
          Email confirmed!
          <br />
          You can now log in in the app.
        </p>
      </div>
    </main>
  )
}
