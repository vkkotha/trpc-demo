import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

export function createContext(opts: CreateHTTPContextOptions): object {
  return {};
}
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTrpcRouter = t.router;
export const publicProcedure = t.procedure;
