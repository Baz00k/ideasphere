import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "../trpc"

export const ideasRouter = createTRPCRouter({
  getWeeklyTopIdeas: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.idea.findMany({
      where: {
        published: true,
      },
      take: 5,
    })
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        published: z.boolean().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.idea.create({
        data: {
          title: input.title,
          description: input.description,
          published: input.published ?? false,
          // authorId: ctx.user.id,
        },
      })
    }),
})
