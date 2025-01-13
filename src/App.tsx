/**
 * Main application component that handles the task management interface.
 * Provides dark mode support, search functionality, and task management.
 */
import { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import { TaskList } from './components/TaskList';
import { Moon, Sun, Search, Plus } from 'lucide-react';
import { useTaskContext } from './context/TaskContext';
import { Toaster } from 'react-hot-toast';
import { TaskModal } from './components/TaskModal';
import { Task } from './types';

/**
 * TaskManagementApp component handles the main UI and functionality.
 * Includes search, dark mode toggle, and task management features.
 */
function TaskManagementApp() {
  const { darkMode, toggleDarkMode, addTask, tasks } = useTaskContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter tasks based on search query across title, description, and category
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding a new task and close the modal
  const handleAddTask = (task: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
    addTask(task);
    setIsAddModalOpen(false);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-pink-50'}`}>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Task Manager
            </h1>
            <button
              onClick={toggleDarkMode}
              className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <Sun className="h-6 w-6 text-yellow-500" />
              ) : (
                <Moon className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              Add Task
            </button>
          </div>
        </header>

        <main>
          <TaskList filteredTasks={filteredTasks} />
        </main>
      </div>
      <TaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddTask}
        mode="add"
      />
      <Toaster position="bottom-right" />
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <TaskManagementApp />
    </TaskProvider>
  );
}

export default App;