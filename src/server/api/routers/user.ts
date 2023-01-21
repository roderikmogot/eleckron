import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  post: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const isExisting = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (isExisting) {
        // returnn error code of 409
        return { error: { code: 409, message: "User already exists" } };
      }
      return ctx.prisma.user.create({
        data: {
          email: input.email,
        },
      });
    }),
  get: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.aPI.findMany({
        where: {
          user: {
            email: input.email,
          },
        },
      });
    }),
});
