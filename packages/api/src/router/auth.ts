import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const authRouter = createTRPCRouter({
  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.user
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @ideasphere/auth package
    return "you can see this secret message!"
  }),
})
