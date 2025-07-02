import { Task } from './todo';

export interface TodoFormProps {
  onAdd: (text: string) => boolean;
}

export interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface StatsProps {
  total: number;
  completed: number;
}

export interface ErrorBannerProps {
  codes: string[];
}
