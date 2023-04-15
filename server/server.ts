import { createHTTPServer } from "@trpc/server/adapters/standalone";

import { appRouter } from "./routers/app";
import { createContext } from "./trpc";

const { server } = createHTTPServer({
  router: appRouter,
  createContext,
});

const PORT = 2022;
server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
})
