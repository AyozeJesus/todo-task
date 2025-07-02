import { render, screen } from '@testing-library/react';
import { describe, expect, vi, beforeEach } from 'vitest';
import { TaskList } from './TaskList';
import { Task } from '../../types/todo';

describe('TaskList', () => {
  const mockToggle = vi.fn();
  const mockDelete = vi.fn();

  beforeEach(() => {
    mockToggle.mockClear();
    mockDelete.mockClear();
  });

  test('renders empty state when list is empty', () => {
    render(<TaskList tasks={[]} onToggle={mockToggle} onDelete={mockDelete} />);

    expect(
      screen.getByText('¡No hay ejercicios! Añade tu primera rutina')
    ).toBeInTheDocument();
  });

  test('renders all tasks when list has items', () => {
    const tasks: Task[] = [
      { id: 1, text: 'Task 1', completed: false },
      { id: 2, text: 'Task 2', completed: true },
    ];

    render(
      <TaskList tasks={tasks} onToggle={mockToggle} onDelete={mockDelete} />
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
