import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ErrorBanner } from './ErrorBanner';

describe('ErrorBanner', () => {
  it('renders messages for error codes', () => {
    render(<ErrorBanner errorCodes={['empty', 'duplicate']} />);
    const banner = screen
      .getByText('La tarea no puede estar vacía.')
      .closest('.error-banner');
    expect(banner).toHaveTextContent('La tarea no puede estar vacía.');
    expect(banner).toHaveTextContent('Esa tarea ya existe.');
  });

  it('renders nothing when codes empty', () => {
    render(<ErrorBanner errorCodes={[]} />);
    expect(screen.queryByText('La tarea no puede estar vacía.')).toBeNull();
  });
});
