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
      return await ctx.prisma.requests.create({
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
      const res = await ctx.prisma.requests.findMany({
        where: {
          userEmail: {
            equals: input.email,
          },
        },
      });

      const excludeId = res.map((item) => {
        const { id, ...rest } = item;
        return rest;
      });

      console.log(excludeId);

      const stringified = excludeId.reduce((newArr, curr) => {
        const {
          uniqueId,
          name,
          method,
          url,
          queryParams,
          authBasic,
          authBearer,
          body,
          createdAt,
          userEmail,
        } = curr;
        const obj = {
          uniqueId,
          name,
          method,
          url,
          queryParams: JSON.parse(queryParams),
          authBasic: JSON.parse(authBasic),
          authBearer: JSON.parse(authBearer),
          body: JSON.parse(body),
          createdAt,
          userEmail,
        };
        newArr.push(obj);
        return newArr;
      }, []);

      return stringified;
    }),
});
