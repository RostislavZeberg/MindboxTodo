import React, {
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { TodosContext } from "../../utils/Context";
import { saveTodosToLocalStorage } from "../../utils/localStorageService";
import { ToDo } from "../ToDo";

export const ToDoList = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [valueInput, setValueInput] = useState("");

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value);
  }, []);

  const handleKeyPress = useCallback((event: { key: string }) => {
    if (event.key === "Enter") {
      const newTodo = {
        id: Date.now(),
        todo: valueInput,
        done: false,
      };
      const newTodos = [...todos, newTodo];
      saveTodosToLocalStorage(newTodos);
      setTodos(newTodos);
      setValueInput("");
    }
  }, [todos, valueInput, setTodos]);


  const memoizedTodos = useMemo(() => {
    return todos.map(todo => (
      <ToDo key={todo.id} todo={todo} />
    ))
  }, [todos])

  return (
    <div className="todos">
      <h1 className="todos__title">todos</h1>
      <input
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        value={valueInput}
        className="todos__input"
        type="text"
        placeholder={"Запишите новое дело и кликните enter"}
      />
      {todos.length === 0 ? <h3 style={{textAlign: "center"}}>Введите запланированное дело в окно выше и нажмите ENTER</h3> : null}
      <div className="todos__list">
        {memoizedTodos}
      </div>
    </div>
  );
};


