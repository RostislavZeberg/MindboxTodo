import { act } from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from '../ToDoList';
import { TodosContext, DoneContext } from '../../../utils/Context';

const todosValue = {
    todos: [ { id: 1, todo: 'Test todo', done: false } ],
    setTodos: jest.fn()
}

const doneValue = {
    toggleMarkDone: {},
    setToggleMarkDone: jest.fn()
}

const TestComponent = () => (
<TodosContext.Provider value={todosValue}>
    <DoneContext.Provider value={doneValue}>
        <ToDoList />
    </DoneContext.Provider>
</TodosContext.Provider>
)

describe('ToDoList component', () => {
    it('Проверяем что компоненты рендерится', () => {
        render(<TestComponent/>); 
        
        expect(screen.getByRole('heading', {name: 'todos'})).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Запишите новое дело и кликните enter')).toBeInTheDocument();
    });

    it('Проверяем добавление нового todo', () => {
    render(<TestComponent/>)

        const input = screen.getByPlaceholderText('Запишите новое дело и кликните enter');
        fireEvent.change(input, { target: { value: 'Test new todo' } });
        act(() => {
        fireEvent.keyDown(input, { key: 'Enter' });
        });
        
        expect(todosValue.setTodos).toHaveBeenCalledTimes(1)
    });

    it('Проверяем удаление todo', () => {
        render(<TestComponent/>)
        const deleteButton = screen.getByRole('button', {name: 'X'});
        act(() => { 
        fireEvent.click(deleteButton);
        })
        
        expect(todosValue.setTodos).toHaveBeenCalledWith([])
    })
});
