import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { TaskFormData, TaskFormProps, TaskPriority, TaskStatus } from '../../types';
import { validateTask } from '../../utils/taskUtils';

// Starting values for a new task.
const emptyForm: TaskFormData = {
  title: '', description: '', status: 'pending', priority: 'medium', dueDate: ''
};

export default function TaskForm({ editingTask, onSave, onCancel }: TaskFormProps) {
  // Each input gets its value from this React state (controlled form).
  const [form, setForm] = useState<TaskFormData>({ ...emptyForm });
  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

  // When the Edit button is clicked, fill in the form with that task's details.
  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate
      });
    } else {
      setForm({ ...emptyForm });
    }
    setErrors({});
  }, [editingTask]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the browser from refreshing the page.
    const formErrors = validateTask(form);
    setErrors(formErrors);

    // Do not save if any required field has a problem.
    if (Object.keys(formErrors).length > 0) return;

    onSave({ ...form, title: form.title.trim(), description: form.description.trim() });
    if (!editingTask) setForm({ ...emptyForm });
  }

  return (
    <form className="panel form" onSubmit={handleSubmit} noValidate>
      <h2>{editingTask ? 'Edit task' : 'Add a task'}</h2>

      <label htmlFor="title">Title</label>
      <input id="title" value={form.title} maxLength={101}
        onChange={event => setForm({ ...form, title: event.target.value })} aria-invalid={!!errors.title} />
      {errors.title && <small className="error">{errors.title}</small>}

      <label htmlFor="description">Description</label>
      <textarea id="description" rows={3} value={form.description}
        onChange={event => setForm({ ...form, description: event.target.value })} aria-invalid={!!errors.description} />
      {errors.description && <small className="error">{errors.description}</small>}

      <div className="form-row">
        <div>
          <label htmlFor="status">Status</label>
          <select id="status" value={form.status}
            onChange={event => setForm({ ...form, status: event.target.value as TaskStatus })}>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority">Priority</label>
          <select id="priority" value={form.priority}
            onChange={event => setForm({ ...form, priority: event.target.value as TaskPriority })}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <label htmlFor="dueDate">Due date</label>
      <input id="dueDate" type="date" value={form.dueDate}
        onChange={event => setForm({ ...form, dueDate: event.target.value })} aria-invalid={!!errors.dueDate} />
      {errors.dueDate && <small className="error">{errors.dueDate}</small>}

      <div className="form-buttons">
        <button type="submit">{editingTask ? 'Save changes' : 'Add task'}</button>
        {editingTask && <button type="button" className="secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
