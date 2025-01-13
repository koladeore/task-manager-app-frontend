/**
 * TaskItem component represents a single task in the task list.
 * Provides functionality for editing, deleting, and completing tasks.
 * Includes drag-and-drop capabilities and animations.
 */
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types';
import { useTaskContext } from '../context/TaskContext';
import { Pencil, Trash2, GripVertical } from 'lucide-react';
import { format } from 'date-fns';
import { TaskModal } from './TaskModal';
import { DeleteModal } from './DeleteModal';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // Setup drag and drop functionality
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleToggleComplete = () => {
    updateTask(task._id, { completed: !task.completed });
  };

  const handleUpdateTask = (updatedTask: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
    updateTask(task._id, updatedTask);
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    deleteTask(task._id);
  };
  // Helper function to determine category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Work': return 'bg-blue-100 text-blue-800';
      case 'Personal': return 'bg-green-100 text-green-800';
      case 'Urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        ref={setNodeRef}
        style={style}
        className={`group relative flex items-center gap-4 rounded-lg border p-4 shadow-sm transition-all hover:shadow-md ${
          task.completed ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-700'
        }`}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none"
        >
          <GripVertical className="h-5 w-5 text-gray-400" />
        </motion.button>

        <motion.input
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="h-5 w-5 rounded border-gray-300"
        />

        <div className="flex-1">
          <motion.h3 
            layout
            className={`font-medium dark:text-white ${task.completed ? 'line-through text-gray-500' : ''}`}
          >
            {task.title}
          </motion.h3>
          <motion.p 
            layout
            className="text-sm text-gray-600 dark:text-gray-300"
          >
            {task.description}
          </motion.p>
          <motion.div 
            layout
            className="mt-2 flex items-center gap-2"
          >
            <motion.span 
              layout
              className={`rounded-full px-2 py-1 text-xs font-medium ${getCategoryColor(task.category)}`}
            >
              {task.category}
            </motion.span>
            <motion.span 
              layout
              className="text-xs text-gray-500 dark:text-gray-400"
            >
              Due: {format(new Date(task.deadline), 'MMM d, yyyy')}
            </motion.span>
          </motion.div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsEditModalOpen(true)}
            className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <Pencil className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDeleteModalOpen(true)}
            className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isEditModalOpen && (
          <TaskModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleUpdateTask}
            initialData={task}
            mode="edit"
          />
        )}

        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            taskTitle={task.title}
          />
        )}
      </AnimatePresence>
    </>
  );
};