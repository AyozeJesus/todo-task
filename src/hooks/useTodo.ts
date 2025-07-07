import { useReducer, useEffect, useCallback, useRef } from 'react';
import { Task } from '../types/todo';
import { TodoAction } from '../types/actions';
import { TodoState } from '../types/state';
import { validateTaskText } from '../utils/validators';
import { generateUniqueId } from '../utils/idGenerator';
import {
  createInitialState,
  saveTasks,
  saveNextId,
  loadNextId,
} from '../utils/localStorage';

/**
 * Todo reducer with comprehensive state management
 *
 * Why useReducer over useState?
 * - Predictable state updates for complex state logic
 * - Easier testing and reasoning about state changes
 * - Centralized state transitions for maintainability
 */
function reducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        errorCodes: [],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t: Task) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
      };
    case 'SET_ERRORS':
      return { ...state, errorCodes: action.payload };
    default:
      return state;
  }
}

/**
 * Custom hook for Todo application state management
 *
 * Features:
 * - Local storage persistence (via utils)
 * - Validation system with error codes
 * - External integration via custom events (jQuery bridge)
 * - Optimized with useCallback for performance
 * - Memory leak safe (no global state)
 */
export function useTodo() {
  const [state, dispatch] = useReducer(reducer, null, createInitialState);

  // Use ref to manage nextId without causing memory leaks
  // This avoids the global variable issue during development hot reloads
  const nextIdRef = useRef<number>(loadNextId());

  /**
   * Adds a new task with validation
   * Returns boolean to indicate success/failure for external integrations
   */
  const addTask = useCallback(
    (text: string): boolean => {
      const errors = validateTaskText(text, state.tasks);
      if (errors.length) {
        dispatch({ type: 'SET_ERRORS', payload: errors });
        return false;
      }

      // Generate unique ID using utility function
      const newTask: Task = {
        id: generateUniqueId(),
        text: text.trim(),
        completed: false,
      };

      dispatch({ type: 'ADD_TASK', payload: newTask });

      // Update nextId ref for localStorage persistence
      nextIdRef.current++;
      return true;
    },
    [state.tasks]
  );

  // Optimized callbacks with useCallback to prevent unnecessary re-renders
  const toggleTask = useCallback(
    (id: number) => dispatch({ type: 'TOGGLE_TASK', payload: id }),
    []
  );

  const deleteTask = useCallback(
    (id: number) => dispatch({ type: 'DELETE_TASK', payload: id }),
    []
  );

  // Persist data to localStorage using utility functions
  useEffect(() => {
    saveTasks(state.tasks);
    saveNextId(nextIdRef.current);
  }, [state.tasks]);

  // External integration: Emit custom events for jQuery bridge
  useEffect(() => {
    const completed = state.tasks.filter((t: Task) => t.completed).length;
    const total = state.tasks.length;

    // Notify external systems (jQuery) about task count changes
    document.dispatchEvent(
      new CustomEvent('todo:count-changed', {
        detail: { total, completed },
      })
    );
  }, [state.tasks]);

  // External integration: Listen for task addition requests from jQuery
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ task?: string }>;
      const { task } = custom.detail || {};

      if (task) {
        const success = addTask(task);
        if (success) {
          // Notify external system about successful addition
          document.dispatchEvent(new CustomEvent('todo:external-added'));
        }
      }
    };

    document.addEventListener('todo:add', handler);
    return () => document.removeEventListener('todo:add', handler);
  }, [addTask]);

  // Return stable object with as const for better TypeScript inference
  return {
    tasks: state.tasks,
    errorCodes: state.errorCodes,
    addTask,
    toggleTask,
    deleteTask,
  } as const;
}
