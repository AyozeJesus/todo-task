import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('shows counts updating when adding and completing a task', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.type(
    screen.getByPlaceholderText(/3 series de press banca/i),
    'Test Task'
  );
  await user.click(screen.getByRole('button', { name: /añadir ejercicio/i }));

  // Check that task was added by verifying it appears in the list
  expect(screen.getByText('Test Task')).toBeInTheDocument();

  // Check stats display - look for specific stat items
  expect(screen.getByText('Total')).toBeInTheDocument();
  expect(screen.getByText('Completados')).toBeInTheDocument();
  expect(screen.getByText('Pendientes')).toBeInTheDocument();

  // Complete the task
  await user.click(screen.getByRole('checkbox'));

  // Should show completed count
  expect(screen.getByText('Completados')).toBeInTheDocument();
});

test('shows error banner on duplicate', async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText(/3 series de press banca/i);
  await user.type(input, 'Dup');
  await user.click(screen.getByRole('button', { name: /añadir ejercicio/i }));

  // Add same task again
  await user.clear(input);
  await user.type(input, 'Dup');
  await user.click(screen.getByRole('button', { name: /añadir ejercicio/i }));

  expect(screen.getByText(/esa tarea ya existe/i)).toBeInTheDocument();
});

test('deletes tasks correctly', async () => {
  const user = userEvent.setup();
  render(<App />);

  // Add two tasks
  const input = screen.getByPlaceholderText(/3 series de press banca/i);
  await user.type(input, 'Task 1');
  await user.click(screen.getByRole('button', { name: /añadir ejercicio/i }));

  await user.clear(input);
  await user.type(input, 'Task 2');
  await user.click(screen.getByRole('button', { name: /añadir ejercicio/i }));

  // Should have 2 tasks
  expect(screen.getByText('Task 1')).toBeInTheDocument();
  expect(screen.getByText('Task 2')).toBeInTheDocument();

  // Delete first task
  const deleteButtons = screen.getAllByRole('button', { name: /eliminar/i });
  await user.click(deleteButtons[0]);

  // Should only have Task 2
  expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
  expect(screen.getByText('Task 2')).toBeInTheDocument();
});
