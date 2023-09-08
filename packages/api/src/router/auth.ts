import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const authRouter = createTRPCRouter({
  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.user
  }),

  getProfile: protectedProcedure.query(({ ctx }) => {
    return ctx.db.profile.findUnique({
      where: {
        userId: ctx.user.id,
      },
    })
  }),

  createUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8).max(72),
        username: z.string().min(3).max(32),
        redirectUrl: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.profile.findUnique({
        where: {
          email: input.email,
        },
      })

      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists",
        })
      }

      const response = await ctx.supabaseAdmin.auth.admin.generateLink({
        type: "signup",
        email: input.email,
        password: input.password,
        options: {
          redirectTo: input.redirectUrl,
        },
      })

      // TODO: Send email to user with link

      if (response.error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: response.error.message,
        })
      }

      if (!response.data.user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No user data returned",
        })
      }

      await ctx.db.profile.create({
        data: {
          userId: response.data.user.id,
          email: input.email,
          username: input.username.trim(),
        },
      })

      return response.data.properties.action_link
    }),
})
