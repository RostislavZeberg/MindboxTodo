import { TodosList } from '../utils/Interface';
// import TodoDataJson from '../../todo.json'

const TODOS_KEY = 'todos';

export const getInitialTodos = (): TodosList | undefined => {
    const storedTodos = localStorage.getItem(TODOS_KEY);
    if (storedTodos) {
        try {
            const todos = JSON.parse(storedTodos);
            if (Array.isArray(todos)) {
                return todos as TodosList;
            }
        } catch (e) {
            console.error("Failed to parse todos from localStorage", e);
        }
    }
};

export const saveTodosToLocalStorage = (todos: TodosList) => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}
