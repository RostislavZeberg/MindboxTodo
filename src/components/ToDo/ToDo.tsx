import { FC, memo, useContext, useState } from "react"
import { Todo } from "../../utils/Interface"
import { DoneContext, TodosContext } from "../../utils/Context"
import { saveTodosToLocalStorage } from "../../utils/localStorageService"

interface ToDoProps {
  todo: Todo
}

export const ToDo: FC<ToDoProps> = memo(({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext)
  const { toggleMarkDone, setToggleMarkDone } = useContext(DoneContext)
  const [controlDone, setControlDone] = useState(false)

  const handlerTodoDelete = (() => {
    if (toggleMarkDone[todo.id]) {
      const newTodos = todos.filter(el => el.id !== todo.id)
      setTodos(newTodos)
      saveTodosToLocalStorage(newTodos)
    } else {
      setControlDone(true)
      setTimeout(() => setControlDone(false), 1000);
    }
  })

  return (
    <div className="item">
      <div className="item__block">
        <button onClick={() => setToggleMarkDone({
          ...toggleMarkDone,
          [todo.id]: !toggleMarkDone[todo.id]
        })} className="item__btn btn-reset">
          <svg className={
            toggleMarkDone[todo.id] ?
              "custom-checkbox"
              :
              "custom-checkbox custom-checkbox-none"}
            width="20" height="15" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 3.47742L3.10291 5.58033L7.58033 1.10291" stroke="#CCB26E" />
          </svg>
        </button>
        <p className="item__descr">{todo.todo}</p>
      </div>
      <button onClick={handlerTodoDelete} className="item__btn-delete btn-reset">X</button>
      {controlDone ? <p className="item__error">Вы не можете удалить дело пока не выполните его</p> : null}
    </div>

  )
})


