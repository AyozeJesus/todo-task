import { MAX_TASK_LENGTH } from '../config/constants';

// Error messages in Spanish for user display
export const errorMessages: Record<string, string> = {
  empty: 'La tarea no puede estar vacía.',
  maxLength: `La tarea no puede superar ${MAX_TASK_LENGTH} caracteres.`,
  duplicate: 'Esa tarea ya existe.',
};

export function getMessages(codes: string[] = []): string[] {
  return codes.map(code => errorMessages[code] || 'Error desconocido');
}
