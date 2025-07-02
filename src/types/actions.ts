import { Task } from './todo';
 
export type TodoAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'TOGGLE_TASK'; payload: number }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'SET_ERRORS'; payload: string[] }; 