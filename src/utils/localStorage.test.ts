import { describe, it, expect, beforeEach } from 'vitest';
import {
  createInitialState,
  loadTasks,
  saveTasks,
  loadNextId,
  saveNextId,
  clearTodoStorage,
} from './localStorage';
import { Task } from '../types/todo';

describe('localStorage utils', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('loadTasks', () => {
    it('should return empty array when no tasks in localStorage', () => {
      const tasks = loadTasks();
      expect(tasks).toEqual([]);
    });

    it('should load tasks from localStorage', () => {
      const mockTasks: Task[] = [
        { id: 1, text: 'Test task', completed: false },
        { id: 2, text: 'Another task', completed: true },
      ];

      localStorage.setItem('tasks', JSON.stringify(mockTasks));
      const tasks = loadTasks();

      expect(tasks).toEqual(mockTasks);
    });

    it('should handle invalid JSON gracefully', () => {
      localStorage.setItem('tasks', 'invalid json');
      const tasks = loadTasks();

      expect(tasks).toEqual([]);
    });
  });

  describe('saveTasks', () => {
    it('should save tasks to localStorage', () => {
      const mockTasks: Task[] = [
        { id: 1, text: 'Test task', completed: false },
      ];

      saveTasks(mockTasks);

      const saved = localStorage.getItem('tasks');
      expect(saved).not.toBeNull();
      expect(JSON.parse(saved as string)).toEqual(mockTasks);
    });

    it('should handle empty array', () => {
      saveTasks([]);

      const saved = localStorage.getItem('tasks');
      expect(saved).not.toBeNull();
      expect(JSON.parse(saved as string)).toEqual([]);
    });
  });

  describe('loadNextId', () => {
    it('should return INITIAL_TASK_ID when no nextId in localStorage', () => {
      const nextId = loadNextId();
      expect(nextId).toBe(1); // INITIAL_TASK_ID value
    });

    it('should load nextId from localStorage', () => {
      localStorage.setItem('nextId', '5');
      const nextId = loadNextId();

      expect(nextId).toBe(5);
    });

    it('should handle invalid nextId gracefully', () => {
      localStorage.setItem('nextId', 'invalid');
      const nextId = loadNextId();

      expect(nextId).toBe(1); // Should fallback to INITIAL_TASK_ID
    });
  });

  describe('saveNextId', () => {
    it('should save nextId to localStorage', () => {
      saveNextId(10);

      const saved = localStorage.getItem('nextId');
      expect(saved).toBe('10');
    });
  });

  describe('createInitialState', () => {
    it('should create initial state with empty tasks and errors', () => {
      const state = createInitialState();

      expect(state).toEqual({
        tasks: [],
        errorCodes: [],
      });
    });

    it('should create initial state with existing tasks', () => {
      const mockTasks: Task[] = [
        { id: 1, text: 'Existing task', completed: false },
      ];

      localStorage.setItem('tasks', JSON.stringify(mockTasks));
      const state = createInitialState();

      expect(state).toEqual({
        tasks: mockTasks,
        errorCodes: [],
      });
    });
  });

  describe('clearTodoStorage', () => {
    it('should clear all todo-related data from localStorage', () => {
      // Set some data
      localStorage.setItem('tasks', '[]');
      localStorage.setItem('nextId', '5');
      localStorage.setItem('unrelated', 'should remain');

      clearTodoStorage();

      expect(localStorage.getItem('tasks')).toBeNull();
      expect(localStorage.getItem('nextId')).toBeNull();
      expect(localStorage.getItem('unrelated')).toBe('should remain');
    });
  });
});
