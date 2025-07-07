import { Task } from '../types/todo';
import { TodoState } from '../types/state';
import { INITIAL_TASK_ID } from '../config/constants';

/**
 * localStorage utility functions for Todo application
 * Centralizes all localStorage operations for better maintainability
 */

const STORAGE_KEYS = {
  TASKS: 'tasks',
  NEXT_ID: 'nextId',
} as const;

/**
 * Creates initial state by loading from localStorage
 * Factory function to avoid sharing state between hook instances
 */
export const createInitialState = (): TodoState => ({
  tasks: loadTasks(),
  errorCodes: [],
});

/**
 * Loads tasks from localStorage with error handling
 */
export const loadTasks = (): Task[] => {
  try {
    const tasksJson = localStorage.getItem(STORAGE_KEYS.TASKS);
    return tasksJson ? JSON.parse(tasksJson) : [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to load tasks from localStorage:', error);
    return [];
  }
};

/**
 * Saves tasks to localStorage with error handling
 */
export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to save tasks to localStorage:', error);
  }
};

/**
 * Loads nextId from localStorage
 */
export const loadNextId = (): number => {
  try {
    const nextIdStr = localStorage.getItem(STORAGE_KEYS.NEXT_ID);
    if (!nextIdStr) {
      return INITIAL_TASK_ID;
    }

    const parsed = Number(nextIdStr);
    return isNaN(parsed) ? INITIAL_TASK_ID : parsed;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to load nextId from localStorage:', error);
    return INITIAL_TASK_ID;
  }
};

/**
 * Saves nextId to localStorage
 */
export const saveNextId = (nextId: number): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.NEXT_ID, String(nextId));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to save nextId to localStorage:', error);
  }
};

/**
 * Clears all todo-related data from localStorage
 * Useful for testing and data reset
 */
export const clearTodoStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.NEXT_ID);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to clear todo storage:', error);
  }
};
