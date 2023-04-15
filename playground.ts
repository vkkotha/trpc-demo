import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { expressHandler } from "trpc-playground/handlers/express";

import { appRouter } from "./server/routers/app";

const main = async (): Promise<void> => {
  const app = express();

  const trpcApiEndpoint = "/api/trpc";
  const playgroundEndpoint = "/trpc-playground";

  app.use(
    trpcApiEndpoint,
    trpcExpress.createExpressMiddleware({
      router: appRouter,
    })
  );

  app.use(
    playgroundEndpoint,
    await expressHandler({
      trpcApiEndpoint,
      playgroundEndpoint,
      router: appRouter,
      // uncomment this if you're using superjson
      request: {
        superjson: true,
      },
    })
  );

  const PORT = 2023;
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log(`Goto http://localhost:${PORT}/trpc-playground to access trpc playground.`);
  });
};

main().then(
  () => {},
  () => {}
);
