import { render, screen } from '@testing-library/react';
import { Stats } from './Stats';
import { Task } from '../../types/todo';

describe('Stats', () => {
  test('displays total and completed task counts', () => {
    const tasks: Task[] = [
      { id: 1, text: 'Task 1', completed: true },
      { id: 2, text: 'Task 2', completed: true },
      { id: 3, text: 'Task 3', completed: true },
      { id: 4, text: 'Task 4', completed: false },
      { id: 5, text: 'Task 5', completed: false },
    ];
    
    render(<Stats tasks={tasks} />);
    
    // Check for all the stats values
    expect(screen.getByText('5')).toBeInTheDocument(); // Total
    expect(screen.getByText('3')).toBeInTheDocument(); // Completed
    expect(screen.getByText('2')).toBeInTheDocument(); // Pending
    expect(screen.getByText('60%')).toBeInTheDocument(); // Progress
    
    // Check for labels in Spanish
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Completados')).toBeInTheDocument();
    expect(screen.getByText('Pendientes')).toBeInTheDocument();
    expect(screen.getByText('Progreso')).toBeInTheDocument();
  });

  test('displays zero counts correctly', () => {
    render(<Stats tasks={[]} />);
    
    // Check for zero values
    expect(screen.getAllByText('0')).toHaveLength(3); // Total, completed, pending
    expect(screen.getByText('0%')).toBeInTheDocument(); // Progress
  });
}); 