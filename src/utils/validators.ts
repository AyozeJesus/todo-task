import { Task } from '../types/todo';
import { MAX_TASK_LENGTH } from '../config/constants';

export function validateTaskText(
  text: string,
  existingTasks: Task[]
): string[] {
  const errors: string[] = [];
  const trimmed = text.trim();

  // Business rule: Task text cannot be empty
  if (!trimmed) {
    errors.push('empty');
  }

  // Business rule: Task text has maximum length constraint
  if (trimmed.length > MAX_TASK_LENGTH) {
    errors.push('maxLength');
  }

  // Business rule: Prevent duplicate tasks (case insensitive)
  if (
    existingTasks.some(
      task => task.text.toLowerCase() === trimmed.toLowerCase()
    )
  ) {
    errors.push('duplicate');
  }

  return errors;
}
