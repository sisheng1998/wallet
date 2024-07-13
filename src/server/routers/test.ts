import { createTRPCRouter, publicProcedure } from "@/server/trpc"

export const testRouter = createTRPCRouter({
  hello: publicProcedure.query(() => "Hello world!"),
})
