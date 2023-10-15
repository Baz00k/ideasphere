import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { SUPABASE_IMAGES_BUCKET } from "@ideasphere/consts"

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

  byId: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const idea = await ctx.db.idea.findUnique({
      where: {
        id: input.id,
      },
      include: {
        _count: {
          select: {
            favoritedBy: true,
          },
        },
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
      },
    })

    if (!idea) throw new TRPCError({ code: "NOT_FOUND", message: "Idea not found" })

    return {
      ...idea,
      favoritedByMe: idea.favoritedBy.length > 0,
    }
  }),

  search: protectedProcedure
    .input(
      z.object({
        query: z.string().max(100),
        cursor: z.string().optional(),
        limit: z.number().min(1).max(100).default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const ideas = await ctx.db.idea.findMany({
        where: {
          published: true,
          OR: [
            {
              title: {
                contains: input.query,
              },
            },
            {
              description: {
                contains: input.query,
              },
            },
          ],
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
        cursor: input.cursor ? { id: input.cursor } : undefined,
        take: input.limit + 1,
      })

      const hasNextPage = ideas.length > input.limit

      return {
        ideas: ideas.slice(0, input.limit).map((idea) => ({
          ...idea,
          description: idea.description.slice(0, 100),
          favoritedByMe: idea.favoritedBy.length > 0,
        })),
        nextPageCursor: hasNextPage ? ideas[ideas.length - 1]?.id : null,
      }
    }),

  createOrUpdate: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        title: z.string().min(3).max(100),
        description: z.string().min(3).max(1000),
        published: z.boolean().optional(),
        images: z.array(z.string()).optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      if (!input.id) {
        return ctx.db.idea.create({
          data: {
            title: input.title,
            description: input.description,
            published: input.published ?? false,
            authorId: ctx.user.id,
            images: input.images,
          },
        })
      }

      return ctx.db.idea.upsert({
        where: {
          id: input.id,
        },
        create: {
          title: input.title,
          description: input.description,
          published: input.published ?? false,
          authorId: ctx.user.id,
          images: input.images,
        },
        update: {
          title: input.title,
          description: input.description,
          published: input.published ?? false,
          images: input.images,
        },
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const idea = await ctx.db.idea.findUnique({
        where: {
          id: input.id,
        },
        select: {
          images: true,
        },
      })

      if (!idea) throw new TRPCError({ code: "NOT_FOUND", message: "Idea not found" })

      const { error } = await ctx.supabaseAdmin.storage
        .from(SUPABASE_IMAGES_BUCKET)
        .remove(idea.images)

      if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message })

      return ctx.db.idea.delete({
        where: {
          id: input.id,
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

  myFavouriteIdeas: protectedProcedure.query(async ({ ctx }) => {
    const ideas = await ctx.db.idea.findMany({
      where: {
        favoritedBy: {
          some: {
            userId: ctx.user.id,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        images: true,
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
    })

    return ideas.map((idea) => ({
      ...idea,
      description: idea.description.slice(0, 100),
      favoritedByMe: idea.favoritedBy.length > 0,
    }))
  }),
})
