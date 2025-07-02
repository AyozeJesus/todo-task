import React from 'react';
import { useTodo } from './hooks/useTodo';
import { TodoForm } from './components/todo/TodoForm';
import { ErrorBanner } from './components/common/ErrorBanner';
import { TaskList } from './components/todo/TaskList';
import { Stats } from './components/todo/Stats';

function App() {
  const { tasks, errorCodes, addTask, toggleTask, deleteTask } = useTodo();

  return (
    <div className="todo-app">
      <TodoForm onAdd={addTask} />
      <ErrorBanner errorCodes={errorCodes} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      <Stats tasks={tasks} />
    </div>
  );
}

export default App;
