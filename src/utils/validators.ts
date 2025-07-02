import { Task } from '../types/todo';
import { MAX_TASK_LENGTH } from '../config/constants';

export function validateTaskText(
  text: string,
  existingTasks: Task[]
): string[] {
  const errors: string[] = [];
  const trimmed = text.trim();

  // Check if text is empty
  if (!trimmed) {
    errors.push('empty');
  }

  // Check if text exceeds maximum length
  if (trimmed.length > MAX_TASK_LENGTH) {
    errors.push('maxLength');
  }

  // Check for duplicates (case insensitive)
  if (
    existingTasks.some(
      task => task.text.toLowerCase() === trimmed.toLowerCase()
    )
  ) {
    errors.push('duplicate');
  }

  return errors;
}
