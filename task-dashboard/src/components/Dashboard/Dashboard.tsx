import { useEffect, useState } from 'react';
import type { Task, TaskFilters, TaskFormData, TaskStatus, SortOption } from '../../types';
import { filterTasks, sortTasks } from '../../utils/taskUtils';
import TaskForm from '../TaskForm/TaskForm';
import TaskFilter from '../TaskFilter/TaskFilter';
import TaskList from '../TaskList/TaskList';

const STORAGE_KEY = 'task-dashboard-tasks';

// This function gets our saved tasks when the page first loads.
function loadTasks(): Task[] {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      // Only use the saved data if it is an array.
      if (Array.isArray(parsedTasks)) return parsedTasks;
    }
  } catch (error) {
    console.error('Could not load tasks:', error);
  }
  return [];
}

export default function Dashboard() {
  // These states hold our tasks, filters, sorting choice, and task being edited.
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [filters, setFilters] = useState<TaskFilters>({ status: 'all', priority: 'all', search: '' });
  const [sortBy, setSortBy] = useState<SortOption>('dueDate');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Save tasks every time the tasks array changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // First filter the tasks, then sort the remaining tasks.
  const filteredTasks = filterTasks(tasks, filters);
  const visibleTasks = sortTasks(filteredTasks, sortBy);

  // Count each status for the four cards at the top of the dashboard.
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  function saveTask(formData: TaskFormData) {
    if (editingTask) {
      // Editing: replace only the task that has the matching ID.
      const updatedTasks = tasks.map(task => {
        if (task.id === editingTask.id) return { ...formData, id: task.id };
        return task;
      });
      setTasks(updatedTasks);
      setEditingTask(null);
    } else {
      // Adding: give the new task a unique ID and put it at the top.
      const newTask: Task = { id: crypto.randomUUID(), ...formData };
      setTasks([newTask, ...tasks]);
    }
  }

  function updateStatus(id: string, newStatus: TaskStatus) {
    // map() keeps all tasks but changes the status of the matching one.
    const updatedTasks = tasks.map(task => {
      if (task.id === id) return { ...task, status: newStatus };
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id: string) {
    // Ask before deleting so a task is not removed by accident.
    if (!window.confirm('Delete this task?')) return;
    // filter() creates a new array without the selected task.
    setTasks(tasks.filter(task => task.id !== id));
    if (editingTask?.id === id) setEditingTask(null);
  }

  return (
    <div className="container py-4 py-md-5">
      <header className="d-flex justify-content-between align-items-center gap-3 mb-4">
        <div>
          <p className="text-primary small fw-bold text-uppercase mb-1">MY WORKSPACE</p>
          <h1 className="h2 fw-bold">Task Management Dashboard</h1>
          <p className="text-secondary mb-0">Plan your day, stay organized, and track your progress.</p>
        </div>
        <span className="badge text-bg-primary rounded-pill p-2 d-none d-md-inline">React + TypeScript</span>
      </header>

      {/* These numbers come from the tasks state above. */}
      <section className="row g-3 mb-4" aria-label="Task statistics">
        <div className="col-6 col-lg-3"><div className="card shadow-sm h-100 border-0"><div className="card-body"><span className="text-secondary small">Total tasks</span><strong className="d-block fs-2">{totalTasks}</strong></div></div></div>
        <div className="col-6 col-lg-3"><div className="card shadow-sm h-100 border-0"><div className="card-body"><span className="text-secondary small">Pending</span><strong className="d-block fs-2">{pendingTasks}</strong></div></div></div>
        <div className="col-6 col-lg-3"><div className="card shadow-sm h-100 border-0"><div className="card-body"><span className="text-secondary small">In progress</span><strong className="d-block fs-2">{inProgressTasks}</strong></div></div></div>
        <div className="col-6 col-lg-3"><div className="card shadow-sm h-100 border-0"><div className="card-body"><span className="text-secondary small">Completed</span><strong className="d-block fs-2">{completedTasks}</strong></div></div></div>
      </section>

      <main className="row g-4 align-items-start">
        <aside className="col-12 col-lg-4">
          {/* Child form sends its data to saveTask in this parent component. */}
          <TaskForm editingTask={editingTask} onSave={saveTask} onCancel={() => setEditingTask(null)} />
        </aside>
        <div className="col-12 col-lg-8">
          {/* Filters update state here, and the list updates automatically. */}
          <TaskFilter filters={filters} sortBy={sortBy} onFiltersChange={setFilters} onSortChange={setSortBy} />
          <div className="d-flex justify-content-between align-items-center my-3"><h2 className="h5 mb-0">Your tasks</h2><span className="badge text-bg-light">{visibleTasks.length} shown</span></div>
          <TaskList tasks={visibleTasks} onStatusChange={updateStatus} onEdit={setEditingTask} onDelete={deleteTask} />
        </div>
      </main>
      <footer className="text-center text-secondary small mt-5">Tasks are saved locally in this browser.</footer>
    </div>
  );
}
