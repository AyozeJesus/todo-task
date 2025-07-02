import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskItem } from './TaskItem';
import { Task } from '../../types/todo';
import { describe, it, expect, vi } from 'vitest';

describe('TaskItem', () => {
  const mockToggle = vi.fn();
  const mockDelete = vi.fn();

  const task: Task = {
    id: 1,
    text: 'Test task',
    completed: false,
  };

  beforeEach(() => {
    mockToggle.mockClear();
    mockDelete.mockClear();
  });

  it('renders task text and checkbox', () => {
    render(
      <TaskItem task={task} onToggle={mockToggle} onDelete={mockDelete} />
    );

    expect(screen.getByText('Test task')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onToggle when checkbox clicked', () => {
    render(
      <TaskItem task={task} onToggle={mockToggle} onDelete={mockDelete} />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockToggle).toHaveBeenCalledWith(1);
  });

  it('calls onDelete when delete button clicked', () => {
    render(
      <TaskItem task={task} onToggle={mockToggle} onDelete={mockDelete} />
    );

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it('shows completed styling when task is completed', () => {
    const completedTask: Task = { ...task, completed: true };
    render(
      <TaskItem
        task={completedTask}
        onToggle={mockToggle}
        onDelete={mockDelete}
      />
    );

    // Use the group role instead of listitem since we improved accessibility
    const taskGroup = screen.getByRole('group');
    expect(taskGroup).toHaveClass('completed');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
