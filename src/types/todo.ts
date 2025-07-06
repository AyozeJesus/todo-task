export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface TaskLike {
  text: string;
  completed?: boolean;
}

export interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}
