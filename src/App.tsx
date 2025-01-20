import { ToDoList } from './components/ToDoList'
import { DoneContext, TodosContext } from './utils/Context'
import { useState, useEffect } from 'react';
import { TodosList } from './utils/Interface';
import { getInitialTodos } from './utils/localStorageService';
import './App.scss'

function App() {
  const [todos, setTodos] = useState<TodosList>([]);
  const [toggleMarkDone, setToggleMarkDone] = useState({});

  useEffect(() => {
    const dataTodos = getInitialTodos();
    if (dataTodos) {
      setTodos(dataTodos);
    }
  }, []);

  return (
    <>
      <TodosContext.Provider value={{ todos, setTodos }}>
        <DoneContext.Provider value={{ toggleMarkDone, setToggleMarkDone }}>
          <ToDoList />
        </DoneContext.Provider>
      </TodosContext.Provider>
    </>
  )
}

export default App
