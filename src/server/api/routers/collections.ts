import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import NEW_COLLECTION_TEMPLATE from "./constants/new-collection-template.api.utils";

export const collectionsRouter = createTRPCRouter({
  post: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newCollection = NEW_COLLECTION_TEMPLATE(input.email);
      const createNewCollection = await ctx.prisma.requests.create({
        data: newCollection,
      });
      return { data: { email: input.email } };
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
          responses,
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
          responses: JSON.parse(responses),
          createdAt,
          userEmail,
        };
        //@ts-ignore
        newArr.push(obj);
        return newArr;
      }, []);

      return stringified;
    }),
});
