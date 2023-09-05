import { authRouter } from "./router/auth"
import { ideasRouter } from "./router/ideas"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  auth: authRouter,
  ideas: ideasRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
