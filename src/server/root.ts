import { testRouter } from "@/server/routers/test"
import { createCallerFactory, createTRPCRouter } from "@/server/trpc"

export const appRouter = createTRPCRouter({
  test: testRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
