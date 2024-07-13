import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import { ZodError } from "zod"

import { db } from "@/db"
import { validateRequest } from "@/lib/auth"

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const { user, session } = await validateRequest()

  return {
    db,
    session,
    user,
    ...opts,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
})

export const createCallerFactory = t.createCallerFactory

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" })

  return next({
    ctx: {
      session: { ...ctx.session },
      user: { ...ctx.user },
    },
  })
})

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>

export type ProtectedTRPCContext = TRPCContext & {
  user: NonNullable<TRPCContext["user"]>
  session: NonNullable<TRPCContext["session"]>
}
