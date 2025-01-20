import { z } from "zod";

export const TodoSchema = z.object({
  id: z.number(),
  todo: z.string(),
  done: z.boolean(),
})

export type Todo = z.infer<typeof TodoSchema>;

export const TodosListSchema = z.array(TodoSchema);
export type TodosList = z.infer<typeof TodosListSchema>;

export type ToggleDone = Record<number, boolean>;