import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const authRouter = createTRPCRouter({
  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.user
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!"
  }),
})
