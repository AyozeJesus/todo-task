export interface Task {
  id: number;
  text: string;
  completed: boolean;
}
 
export interface TaskLike {
  text: string;
  completed?: boolean;
} 