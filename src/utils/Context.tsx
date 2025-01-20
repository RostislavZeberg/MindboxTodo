import React, { createContext } from "react";
import { TodosList, ToggleDone } from "./Interface";

interface TodosContextType {
  todos: TodosList;
  setTodos: React.Dispatch<React.SetStateAction<TodosList>>;
}
interface DoneContextType {
    toggleMarkDone: ToggleDone;
    setToggleMarkDone: React.Dispatch<React.SetStateAction<ToggleDone>>;
}

export const TodosContext = createContext<TodosContextType>({
    todos: [],
    setTodos: () => {}
});
export const DoneContext = createContext<DoneContextType>({
    toggleMarkDone: {},
    setToggleMarkDone: () => {}
});


