import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTrpcRouter, publicProcedure } from "../trpc";

interface User {
  id: number;
  name: string;
}

const userList: User[] = [
  {
    id: 0,
    name: "John Smith",
  },
];

export const userRouter = createTrpcRouter({
  getUsers: publicProcedure.query(() => {
    return userList;
  }),
  getUserById: publicProcedure.input(z.number()).query((opts) => {
    const { input } = opts;
    const match = userList.filter((item) => item.id === input);
    if (match.length === 0) {
      throw new TRPCError({
        message: "User not found.",
        code: "NOT_FOUND",
      });
    }
    return match;
  }),
  createUser: publicProcedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (opts) => {
      const { input } = opts;
      const id = userList.length - 1 + 1;
      const user: User = {
        id,
        name: input.name,
      };
      userList.push(user);
      return user;
    }),
});
