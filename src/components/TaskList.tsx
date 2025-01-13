/**
 * TaskList component manages the list of tasks with drag-and-drop functionality.
 * Handles task reordering and renders individual TaskItem components.
 */
import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { TaskItem } from './TaskItem';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskListProps {
  filteredTasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ filteredTasks }) => {
  const { reorderTasks } = useTaskContext();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = filteredTasks.findIndex((task) => task._id === active.id);
      const newIndex = filteredTasks.findIndex((task) => task._id === over.id);
      
      const newTasks = arrayMove(filteredTasks, oldIndex, newIndex).map((task, index) => ({
        ...task,
        order: index
      }));
      
      reorderTasks(newTasks);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filteredTasks.map(task => task._id)}
        strategy={verticalListSortingStrategy}
      >
        <motion.div 
          layout
          className="space-y-4"
        >
          <AnimatePresence>
            {filteredTasks.map((task: Task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </AnimatePresence>
        </motion.div>
      </SortableContext>
    </DndContext>
  );
};