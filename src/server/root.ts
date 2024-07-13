import { userRouter } from "@/server/routers/user"
import { createCallerFactory, createTRPCRouter } from "@/server/trpc"

export const appRouter = createTRPCRouter({
  user: userRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
