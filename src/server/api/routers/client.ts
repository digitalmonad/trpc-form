import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const clientRouter = createTRPCRouter({
  clientDetail: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.client.findFirst({ where: { id: { equals: input.id } } });
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        age: z.number().min(1),
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.client.upsert({
        where: { id: input.id },
        update: {
          name: input.name,
          age: input.age,
        },
        create: {
          name: input.name,
          age: input.age,
        },
      });
    }),
});
