import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";

import type { AppRouter } from "../server/routers/app";
import "./register-fetch";

const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    loggerLink({
      enabled: (opts) => true,
    }),
    httpBatchLink({
      url: "http://localhost:2022",
    }),
  ],
});

async function main (): Promise<void> {
  const user = await trpc.user.getUser.query("1");
  console.log(user);
}

main().then(
  () => {},
  () => {}
)
