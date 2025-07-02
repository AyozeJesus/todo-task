import { describe, it, expect } from 'vitest';
import { errorMessages, getMessages } from './errorMessages';

describe('errorMessages', () => {
  it('contains all expected error codes', () => {
    expect(errorMessages.empty).toBeDefined();
    expect(errorMessages.maxLength).toBeDefined();
    expect(errorMessages.duplicate).toBeDefined();
  });

  it('getMessages returns correct messages for codes', () => {
    const messages = getMessages(['empty', 'duplicate']);
    expect(messages).toEqual([
      'La tarea no puede estar vacía.',
      'Esa tarea ya existe.',
    ]);
  });

  it('getMessages handles unknown codes', () => {
    const messages = getMessages(['unknown']);
    expect(messages).toEqual(['Error desconocido']);
  });

  it('getMessages returns empty array for empty input', () => {
    expect(getMessages([])).toEqual([]);
  });
}); 