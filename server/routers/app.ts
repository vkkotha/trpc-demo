import { createTrpcRouter, publicProcedure } from "../trpc";
import { userRouter } from "./user";

export const appRouter = createTrpcRouter({
  healthCheck: publicProcedure.query((req) => {
    console.log(req);
    return "OK";
  }),

  user: userRouter,
});

export type AppRouter = typeof appRouter;
