import { z } from "zod";
import crypto from "crypto";

import { createTRPCRouter, publicProcedure } from "../trpc";

import NEW_COLLECTION_TEMPLATE from "./constants/new-collection-template.api.utils";

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
        return { error: { code: 409, message: "User already exists" } };
      }

      const createUser = await ctx.prisma.user.create({
        data: {
          email: input.email,
        },
      });

      const firstRequest = NEW_COLLECTION_TEMPLATE(input.email);

      const createFirstRequest = await ctx.prisma.requests.create({
        data: firstRequest,
      });

      return { data: { email: input.email } };
    }),
});
