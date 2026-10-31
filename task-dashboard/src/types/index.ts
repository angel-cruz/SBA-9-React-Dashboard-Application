// These types limit which values we can use for task status and priority.
export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';
export type SortOption = 'dueDate' | 'priority' | 'title';

// Each task needs an ID and the information entered in the form.
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // Stored like 2026-10-30.
}

// The form has the same fields as Task, except the ID is added later.
export type TaskFormData = Omit<Task, 'id'>;

// The user can select a status, priority, and search text.
export interface TaskFilters {
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  search: string;
}

// Props tell TypeScript what each child component receives from its parent.
export interface TaskItemProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: string, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export interface TaskFormProps {
  editingTask: Task | null;
  onSave: (data: TaskFormData) => void;
  onCancel: () => void;
}

export interface TaskFilterProps {
  filters: TaskFilters;
  sortBy: SortOption;
  onFiltersChange: (filters: TaskFilters) => void;
  onSortChange: (sort: SortOption) => void;
}
