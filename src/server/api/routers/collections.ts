import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const collectionsRouter = createTRPCRouter({
  post: publicProcedure
    .input(
      z.object({
        uniqueId: z.string(),
        name: z.string(),
        method: z.string(),
        url: z.string(),
        queryParams: z.string(),
        authBasic: z.string(),
        authBearer: z.string(),
        body: z.string(),
        createdAt: z.string(),
        userEmail: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.aPI.create({
        data: {
          uniqueId: input.uniqueId,
          name: input.name,
          method: input.method,
          url: input.url,
          queryParams: input.queryParams,
          authBasic: input.authBasic,
          authBearer: input.authBearer,
          body: input.body,
          createdAt: input.createdAt,
          userEmail: input.userEmail,
        },
      });
    }),
  get: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return ctx.prisma.aPI.findMany({
        where: {
          userEmail: input.email,
        },
      });
    }),
});
