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
    <div className="shell">
      <header className="header">
        <div>
          <p className="eyebrow">MY WORKSPACE</p>
          <h1>Task Management Dashboard</h1>
          <p>Plan your day, stay organized, and track your progress.</p>
        </div>
        <span className="header-pill">React + TypeScript</span>
      </header>

      {/* These numbers come from the tasks state above. */}
      <section className="stats" aria-label="Task statistics">
        <div className="stat"><span>Total tasks</span><strong>{totalTasks}</strong></div>
        <div className="stat"><span>Pending</span><strong>{pendingTasks}</strong></div>
        <div className="stat"><span>In progress</span><strong>{inProgressTasks}</strong></div>
        <div className="stat"><span>Completed</span><strong>{completedTasks}</strong></div>
      </section>

      <main className="dashboard">
        <aside>
          {/* Child form sends its data to saveTask in this parent component. */}
          <TaskForm editingTask={editingTask} onSave={saveTask} onCancel={() => setEditingTask(null)} />
        </aside>
        <div className="content">
          {/* Filters update state here, and the list updates automatically. */}
          <TaskFilter filters={filters} sortBy={sortBy} onFiltersChange={setFilters} onSortChange={setSortBy} />
          <div className="list-heading"><h2>Your tasks</h2><span>{visibleTasks.length} shown</span></div>
          <TaskList tasks={visibleTasks} onStatusChange={updateStatus} onEdit={setEditingTask} onDelete={deleteTask} />
        </div>
      </main>
      <footer>Tasks are saved locally in this browser.</footer>
    </div>
  );
}
