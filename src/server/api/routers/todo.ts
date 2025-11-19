import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.todo.findMany({
            orderBy: { createdAt: "desc" },
        });
    }),

    create: publicProcedure
        .input(z.object({ text: z.string().min(1) }))
        .mutation(({ ctx, input }) => {
            return ctx.db.todo.create({
                data: {
                    text: input.text,},
            });
        }),
    
        delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.db.todo.delete({
            where: { id: input.id },
        });
    }),
});