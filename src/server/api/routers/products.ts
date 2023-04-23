import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const productsRouter = createTRPCRouter({
  getAll: protectedProcedure.input(z.object({
    merchantId: z.number().positive()
  })).mutation(async ({ ctx, input }) => {
    if (!ctx.session?.user) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const products = await ctx.prisma.product.findMany({
      take: 100,
      where: {
        merchantId: input.merchantId,
        merchant: {
          user: {
            id: ctx.session.user.id || "",
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return products
  }),

  getById: protectedProcedure.input(z.object({
    productId: z.string().min(1),
    merchantId: z.number().positive()
  })).mutation(async ({ ctx, input }) => {
    const product = await ctx.prisma.product.findFirst({
      where: {
        id: input.productId,
        merchantId: input.merchantId
      }
    })

    if (!product) throw new TRPCError({ code: "NOT_FOUND" })

    return product
  }),

  create: protectedProcedure.input(z.object({
    merchantId: z.number().positive(),
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(1000).optional(),
    image: z.string().url().optional(),
    active: z.boolean(),
    price: z.number().positive()
  })).mutation(async ({ ctx, input }) => {
    const merchant = await ctx.prisma.merchant.findFirst({
      where: {
        id: input.merchantId,
        user: {
          id: ctx.session.user.id || "",
        },
      },
    })

    if (!merchant) throw new TRPCError({ code: "NOT_FOUND" })

    const product = await ctx.prisma.product.create({
      data: {
        title: input.title,
        description: input.description,
        image: input.image,
        active: input.active,
        price: input.price,
        merchant: {
          connect: {
            id: input.merchantId,
          },
        },
      },
    })

    if (!product) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })

    return product
  }),

  delete: protectedProcedure.input(z.object({
    merchantId: z.number().positive(),
    productId: z.string().min(1),
  })).mutation(async ({ ctx, input }) => {
    if (!ctx.session.user) throw new TRPCError({ code: "BAD_REQUEST" })

    const merchant = await ctx.prisma.merchant.findFirst({
      where: {
        id: input.merchantId,
        products: {
          some: {
            id: input.productId,
          },
        },
        user: {
          id: ctx.session.user.id || "",
        },
      },
    })

    if (!merchant) throw new TRPCError({ code: "NOT_FOUND" })

    const response = await ctx.prisma.product.delete({
      where: {
        id: input.productId,
      },
      include: {
        merchant: {
          select: { subdomain: true, customDomain: true },
        },
      },
    })
    return response
  }),

  update: protectedProcedure.input(z.object({
    merchantId: z.number().positive(),
    productId: z.string().min(1),
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(1000).optional(),
    image: z.string().url().optional(),
    active: z.boolean(),
    price: z.number().positive()
  })).mutation(async ({ ctx, input }) => {
    if (!ctx.session.user) throw new TRPCError({ code: "BAD_REQUEST" })

    const merchant = await ctx.prisma.merchant.findFirst({
      where: {
        id: input.merchantId,
        products: {
          some: {
            id: input.productId,
          },
        },
        user: {
          id: ctx.session.user.id || "",
        },
      },
    })

    if (!merchant) throw new TRPCError({ code: "NOT_FOUND" })

    const product = await ctx.prisma.product.update({
      where: {
        id: input.productId,
      },
      data: {
        title: input.title,
        description: input.description,
        image: input.image,
        active: input.active,
        price: input.price,
      },
    })

    if (!product) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })

    return product
  })
});