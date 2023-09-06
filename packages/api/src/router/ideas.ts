import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "../trpc"

export const ideasRouter = createTRPCRouter({
  weeklyTopIdeas: protectedProcedure.query(async ({ ctx }) => {
    const ideas = await ctx.prisma.idea.findMany({
      where: {
        published: true,
        createdAt: {
          gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    })
    return ideas.map((idea) => {
      if (idea.description.length > 100) {
        idea.description = idea.description.substring(0, 100) + "..."
      }
      return idea
    })
  }),

  byId: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.idea.findUnique({
      where: {
        id: input.id,
      },
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
