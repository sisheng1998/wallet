import { createTRPCRouter, protectedProcedure } from "@/server/trpc"

export const userRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(({ ctx }) => ctx.user),
})
