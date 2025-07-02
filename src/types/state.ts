import { Task } from './todo';

export interface TodoState {
  tasks: Task[];
  errorCodes: string[];
}
