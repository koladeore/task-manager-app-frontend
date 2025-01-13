/**
 * Type definitions for the task management application.
 * Defines the structure of tasks and context types.
*/

// Available task categories
export type TaskCategory = 'Work' | 'Personal' | 'Urgent';

// Task interface defining the structure of a task
export interface Task {
  _id: string;
  title: string;
  description: string;
  category: TaskCategory;
  completed: boolean;
  deadline: Date;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Context type for the TaskContext provider
export interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  darkMode: boolean;
  toggleDarkMode: () => void;
  addTask: (task: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  reorderTasks: (tasks: Task[]) => Promise<void>;
}