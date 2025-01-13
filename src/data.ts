import { Task } from './types';

export const mockTasks: Task[] = [
  {
    _id: '1',
    title: 'Complete Project Proposal',
    description: 'Draft and submit the Q2 project proposal for client review',
    category: 'Work',
    completed: false,
    deadline: new Date('2024-03-25'),
    order: 0,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01')
  },
  {
    _id: '2',
    title: 'Gym Session',
    description: 'Weekly workout routine - focus on cardio',
    category: 'Personal',
    completed: true,
    deadline: new Date('2024-03-20'),
    order: 1,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01')
  },
  {
    _id: '3',
    title: 'Client Meeting Preparation',
    description: 'Prepare presentation slides for tomorrow\'s client meeting',
    category: 'Urgent',
    completed: false,
    deadline: new Date('2024-03-15'),
    order: 2,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01')
  },
  {
    _id: '4',
    title: 'Buy Groceries',
    description: 'Get weekly groceries including fruits and vegetables',
    category: 'Personal',
    completed: false,
    deadline: new Date('2024-03-18'),
    order: 3,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01')
  },
  {
    _id: '5',
    title: 'Code Review',
    description: 'Review pull requests for the new feature implementation',
    category: 'Work',
    completed: false,
    deadline: new Date('2024-03-17'),
    order: 4,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01')
  }
];