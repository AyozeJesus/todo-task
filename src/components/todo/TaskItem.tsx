import React from 'react';
import { TaskItemProps } from '../../types/components';
import { UI_TEXT } from '../../constants/uiText';

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
}) => {
  const taskId = `task-${task.id}`;
  const checkboxId = `checkbox-${task.id}`;
  const deleteId = `delete-${task.id}`;

  return (
    <li
      className={`task-item ${task.completed ? 'completed' : ''}`}
      role="group"
      aria-labelledby={taskId}
    >
      <label className="task-label" htmlFor={checkboxId}>
        <input
          id={checkboxId}
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
          aria-describedby={`${taskId}-status`}
        />
        <span id={taskId} className="task-text">
          {task.text}
        </span>
        <span id={`${taskId}-status`} className="sr-only">
          {task.completed
            ? UI_TEXT.TASK_ITEM.COMPLETED_STATUS
            : UI_TEXT.TASK_ITEM.PENDING_STATUS}
        </span>
      </label>
      <button
        id={deleteId}
        onClick={() => onDelete(task.id)}
        className="delete-btn"
        aria-label={`Eliminar tarea: ${task.text}`}
        aria-describedby={`${deleteId}-help`}
      >
        🗑️
      </button>
      <div id={`${deleteId}-help`} className="sr-only">
        {UI_TEXT.TASK_ITEM.DELETE_HELP}
      </div>
    </li>
  );
};
