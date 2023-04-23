import { createTRPCRouter } from "~/server/api/trpc";
import { merchantsRouter } from "./routers/merchants";
import { productsRouter } from "./routers/products";

export const appRouter = createTRPCRouter({
  products: productsRouter,
  merchants: merchantsRouter,
});

export type AppRouter = typeof appRouter;
