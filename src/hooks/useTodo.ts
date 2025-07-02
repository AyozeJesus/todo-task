import { useReducer, useEffect, useCallback } from 'react';
import { Task } from '../types/todo';
import { TodoAction } from '../types/actions';
import { INITIAL_TASK_ID } from '../config/constants';
import { validateTaskText } from '../utils/validators';
import { TodoState } from '../types/state';

let nextId = INITIAL_TASK_ID;

const initialState: TodoState = {
  tasks: [],
  errorCodes: [],
};

function reducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload], errorCodes: [] };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t: Task) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t,
        ),
      };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) };
    case 'SET_ERRORS':
      return { ...state, errorCodes: action.payload };
    default:
      return state;
  }
}

export function useTodo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTask = useCallback(
    (text: string): boolean => {
      const errors = validateTaskText(text, state.tasks);
      if (errors.length) {
        dispatch({ type: 'SET_ERRORS', payload: errors });
        return false;
      }
      const newTask: Task = { id: nextId++, text: text.trim(), completed: false };
      dispatch({ type: 'ADD_TASK', payload: newTask });
      return true;
    },
    [state.tasks],
  );

  const toggleTask = useCallback((id: number) => dispatch({ type: 'TOGGLE_TASK', payload: id }), []);
  const deleteTask = useCallback((id: number) => dispatch({ type: 'DELETE_TASK', payload: id }), []);

  // Emit event when tasks change
  useEffect(() => {
    const completed = state.tasks.filter((t: Task) => t.completed).length;
    const total = state.tasks.length;
    document.dispatchEvent(
      new CustomEvent('todo:count-changed', {
        detail: { total, completed },
      }),
    );
  }, [state.tasks]);

  // Listener for external todo:add events
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ task?: string }>;
      const { task } = custom.detail || {};
      if (task) {
        const success = addTask(task);
        if (success) {
          // Emit specific event for external task addition success
          document.dispatchEvent(new CustomEvent('todo:external-added'));
        }
      }
    };
    document.addEventListener('todo:add', handler);
    return () => document.removeEventListener('todo:add', handler);
  }, [addTask]);

  return {
    tasks: state.tasks,
    errorCodes: state.errorCodes,
    addTask,
    toggleTask,
    deleteTask,
  } as const;
} 