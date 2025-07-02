import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TodoForm } from './TodoForm';

describe('TodoForm', () => {
  test('calls onAdd with input value', async () => {
    const mockAdd = vi.fn().mockReturnValue(true);
    const user = userEvent.setup();
    render(<TodoForm onAdd={mockAdd} />);

    const input = screen.getByPlaceholderText(/3 series de press banca/i);
    await user.type(input, 'Form Task');
    await user.click(screen.getByRole('button', { name: /añadir ejercicio/i }));

    expect(mockAdd).toHaveBeenCalledWith('Form Task');
    expect(input).toHaveValue(''); // Input should be cleared after submit
  });

  test('clears input after successful submission', async () => {
    const mockAdd = vi.fn().mockReturnValue(true);
    const user = userEvent.setup();
    render(<TodoForm onAdd={mockAdd} />);

    const input = screen.getByPlaceholderText(/3 series de press banca/i);
    await user.type(input, 'Test');
    await user.click(screen.getByRole('button', { name: /añadir ejercicio/i }));

    expect(input).toHaveValue('');
    expect(mockAdd).toHaveBeenCalledWith('Test');
  });

  test('does not clear input after failed submission', async () => {
    const mockAdd = vi.fn().mockReturnValue(false);
    const user = userEvent.setup();
    render(<TodoForm onAdd={mockAdd} />);

    const input = screen.getByPlaceholderText(/3 series de press banca/i);
    await user.type(input, 'Test');
    await user.click(screen.getByRole('button', { name: /añadir ejercicio/i }));

    expect(input).toHaveValue('Test');
    expect(mockAdd).toHaveBeenCalledWith('Test');
  });
}); 