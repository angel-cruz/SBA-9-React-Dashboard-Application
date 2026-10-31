import type { Task, TaskFilters, SortOption, TaskFormData } from '../types';

// Filter tasks based on the dropdowns and search text.
export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  return tasks.filter(task => {
    // A value of 'all' means we do not need to check that field.
    const matchesStatus = filters.status === 'all' || task.status === filters.status;
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;

    // Make everything lowercase so searching is not case-sensitive.
    const searchText = filters.search.trim().toLowerCase();
    const taskText = (task.title + ' ' + task.description).toLowerCase();
    const matchesSearch = taskText.includes(searchText);

    // A task is shown only if all three checks are true.
    return matchesStatus && matchesPriority && matchesSearch;
  });
}

// Sort tasks without changing the original tasks array.
export function sortTasks(tasks: Task[], sortBy: SortOption): Task[] {
  const sortedTasks = [...tasks]; // Copy first because sort() changes an array.

  if (sortBy === 'title') {
    sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'priority') {
    // Smaller numbers come first, so high priority appears at the top.
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    sortedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  } else {
    // Dates use YYYY-MM-DD, which can be sorted as strings.
    sortedTasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }
  return sortedTasks;
}

// Return error messages for any form fields that need fixing.
export function validateTask(data: TaskFormData): Partial<Record<keyof TaskFormData, string>> {
  const errors: Partial<Record<keyof TaskFormData, string>> = {};
  if (data.title.trim() === '') errors.title = 'Title is required.';
  else if (data.title.trim().length > 100) errors.title = 'Title must be 100 characters or fewer.';

  if (data.description.trim() === '') errors.description = 'Description is required.';

  // Check that the date is in the expected format and is a real date.
  const dateIsValid = /^\d{4}-\d{2}-\d{2}$/.test(data.dueDate);
  const date = new Date(data.dueDate + 'T12:00:00');
  if (!dateIsValid || Number.isNaN(date.getTime()) ||
      (dateIsValid && date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0') !== data.dueDate)) {
    errors.dueDate = 'Enter a valid due date.';
  }
  return errors;
}

// Change a stored date into a friendlier date for the task card.
export function formatDate(date: string): string {
  if (!date) return 'No date';
  // Noon helps prevent a date shifting because of timezone differences.
  return new Date(date + 'T12:00:00').toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric'
  });
}
