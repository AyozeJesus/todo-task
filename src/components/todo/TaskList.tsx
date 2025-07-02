import React from 'react';
import { Task } from '../../types/todo';
import { TaskItem } from './TaskItem';
import { UI_TEXT } from '../../constants/uiText';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onDelete,
}) => {
  if (!tasks.length) {
    return (
      <div
        className="empty-state"
        role="status"
        aria-label="Estado de lista vacía"
      >
        <span className="empty-icon" aria-hidden="true">
          {UI_TEXT.EMPTY_STATE.ICON}
        </span>
        <p className="empty-text">{UI_TEXT.EMPTY_STATE.MESSAGE}</p>
      </div>
    );
  }

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div role="region" aria-label="Lista de tareas de gimnasio">
      <h3 className="sr-only">Tareas de ejercicios ({tasks.length} total)</h3>
      <ul
        className="task-list"
        role="list"
        aria-label={`Lista con ${tasks.length} tareas, ${completedCount} completadas`}
      >
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};
