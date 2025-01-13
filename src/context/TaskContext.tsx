/**
 * TaskContext provides global state management for tasks and related functionality.
 * Handles API communication, task CRUD operations, and dark mode preferences.
*/
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Task, TaskContextType } from '../types';
import { toast } from 'react-hot-toast';

// API base URL for all task-related requests
const API_URL = import.meta.env.VITE_API_URL as string;

const TaskContext = createContext<TaskContextType | undefined>(undefined);

/**
 * TaskProvider component manages the global state and provides task-related
 * functionality to all child components.
 */
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State management for tasks, loading status, errors, and dark mode
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  /**
   * Fetches all tasks from the backend API.
   * Updates the tasks state and handles loading/error states.
   */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}api/tasks`);
        setTasks(response.data);
        setError(null);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data?.message || 'Failed to load tasks');
          toast.error(err.response.data?.message || 'Failed to load tasks');
        } else {
          setError('An unknown error occurred');
          toast.error('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  
  /**
   * Adds a new task to the backend and updates local state.
   * New tasks are added to the beginning of the list.
  */
  const addTask = async (task: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await axios.post(`${API_URL}/api/tasks`, task);
      setTasks(prevTasks => [response.data, ...prevTasks]);
      toast.success('Task added successfully');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data?.message || 'Failed to add task');
        setError(err.response.data?.message || 'Failed to add task');
      } else {
        toast.error('An unknown error occurred');
        setError('An unknown error occurred');
      }
    }
  };

  /**
   * Updates an existing task in the backend and local state.
  */
  const updateTask = async (id: string, taskUpdate: Partial<Task>) => {
    try {
      const response = await axios.patch(`${API_URL}/tasks/${id}`, taskUpdate);
      setTasks(prevTasks =>
        prevTasks.map(task => (task._id === id ? response.data : task))
      );
      toast.success('Task updated successfully');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data?.message || 'Failed to update task');
        setError(err.response.data?.message || 'Failed to update task');
      } else {
        toast.error('An unknown error occurred');
        setError('An unknown error occurred');
      }
    }
  };

  /**
   * Deletes a task from the backend and local state.
  */
  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      toast.success('Task deleted successfully');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data?.message || 'Failed to delete task');
        setError(err.response.data?.message || 'Failed to delete task');
      } else {
        toast.error('An unknown error occurred');
        setError('An unknown error occurred');
      }
    }
  };
 /**
 * Reorders tasks on the backend and updates local state.
 * Persists the reordered task list so that the order remains after a page reload.
 * The backend is expected to handle saving the new order in persistent storage (e.g., a database).
 */
  const reorderTasks = async (reorderedTasks: Task[]) => {
    try {
      // Send reordered tasks to the backend to persist the new order
      await axios.post(`${API_URL}/tasks/reorder`, { tasks: reorderedTasks });

      // Update the local state with the new order
      setTasks(reorderedTasks);

      // Display success feedback to the user
      toast.success('Tasks reordered successfully');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        // Handle error from backend response
        toast.error(err.response.data?.message || 'Failed to reorder tasks');
        setError(err.response.data?.message || 'Failed to reorder tasks');
      } else {
        // Handle unknown errors
        toast.error('An unknown error occurred');
        setError('An unknown error occurred');
      }
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        darkMode,
        toggleDarkMode,
        addTask,
        updateTask,
        deleteTask,
        reorderTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
