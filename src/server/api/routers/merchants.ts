import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const merchantsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const merchants = await ctx.prisma.merchant.findMany({
      where: {
        user: {
          id: ctx.session.user.id || "",
        },
      },
    })

    return merchants
  }),
});