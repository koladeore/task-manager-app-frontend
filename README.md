# Task Management Application

A modern, feature-rich task management application built with React, TypeScript, and Node.js.

![Task Management App](https://source.unsplash.com/random/1200x630/?productivity,task)

## Features

- ✨ Modern and intuitive user interface
- 🌓 Dark mode support
- ✅ Create, read, update, and delete tasks
- 🔍 Search and filter tasks
- 🏷️ Categorize tasks (Work, Personal, Urgent)
- 📱 Fully responsive design
- 🎯 Task completion tracking
- 📅 Deadline management
- 🔄 Drag and drop task reordering
- ✨ Beautiful animations with Framer Motion

## Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- DND Kit for drag and drop
- Axios for API requests
- React Hot Toast for notifications
- Lucide React for icons
- Date-fns for date formatting

## Getting Started

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

# start the frontend
npm run dev
```

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `POST /api/tasks/reorder` - Reorder tasks

## Project Structure

```
task-management-app/
├── src/
│   ├── components/        # React components
│   ├── context/          # React context
│   ├── types/            # TypeScript types
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [DND Kit](https://dndkit.com)
- [Lucide Icons](https://lucide.dev)