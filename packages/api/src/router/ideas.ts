import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "../trpc"

export const ideasRouter = createTRPCRouter({
  weeklyTopIdeas: protectedProcedure.query(async ({ ctx }) => {
    const ideas = await ctx.db.idea.findMany({
      where: {
        published: true,
        createdAt: {
          gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        },
      },
      orderBy: [
        {
          favoritedBy: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
      select: {
        id: true,
        title: true,
        description: true,
        favoritedBy: {
          where: {
            userId: ctx.user.id,
          },
          select: {
            _count: {
              select: {
                favoritedIdeas: true,
              },
            },
          },
        },
        _count: {
          select: {
            favoritedBy: true,
          },
        },
      },
      take: 10,
    })

    return ideas.map((idea) => ({
      ...idea,
      description: idea.description.slice(0, 100),
      favoritedByMe: idea.favoritedBy.length > 0,
    }))
  }),

  byId: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return ctx.db.idea.findUnique({
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
      return ctx.db.idea.create({
        data: {
          title: input.title,
          description: input.description,
          published: input.published ?? false,
          authorId: ctx.user.id,
        },
      })
    }),

  favourite: protectedProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
    return ctx.db.idea.update({
      where: {
        id: input.id,
      },
      data: {
        favoritedBy: {
          connect: {
            userId: ctx.user.id,
          },
        },
      },
    })
  }),

  unfavourite: protectedProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
    return ctx.db.idea.update({
      where: {
        id: input.id,
      },
      data: {
        favoritedBy: {
          disconnect: {
            userId: ctx.user.id,
          },
        },
      },
    })
  }),
})
