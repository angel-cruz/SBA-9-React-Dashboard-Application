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
    <form className="card shadow-sm border-0 p-3 p-md-4" onSubmit={handleSubmit} noValidate>
      <h2 className="h5 mb-3">{editingTask ? 'Edit task' : 'Add a task'}</h2>

      <label className="form-label fw-semibold mt-2" htmlFor="title">Title</label>
      <input className="form-control" id="title" value={form.title} maxLength={101}
        onChange={event => setForm({ ...form, title: event.target.value })} aria-invalid={!!errors.title} />
      {errors.title && <small className="text-danger small d-block">{errors.title}</small>}

      <label className="form-label fw-semibold mt-2" htmlFor="description">Description</label>
      <textarea className="form-control" id="description" rows={3} value={form.description}
        onChange={event => setForm({ ...form, description: event.target.value })} aria-invalid={!!errors.description} />
      {errors.description && <small className="text-danger small d-block">{errors.description}</small>}

      <div className="row g-2">
        <div className="col-6">
          <label className="form-label fw-semibold mt-2" htmlFor="status">Status</label>
          <select className="form-select" id="status" value={form.status}
            onChange={event => setForm({ ...form, status: event.target.value as TaskStatus })}>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="col-6">
          <label className="form-label fw-semibold mt-2" htmlFor="priority">Priority</label>
          <select className="form-select" id="priority" value={form.priority}
            onChange={event => setForm({ ...form, priority: event.target.value as TaskPriority })}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <label className="form-label fw-semibold mt-2" htmlFor="dueDate">Due date</label>
      <input className="form-control" id="dueDate" type="date" value={form.dueDate}
        onChange={event => setForm({ ...form, dueDate: event.target.value })} aria-invalid={!!errors.dueDate} />
      {errors.dueDate && <small className="text-danger small d-block">{errors.dueDate}</small>}

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-primary" type="submit">{editingTask ? 'Save changes' : 'Add task'}</button>
        {editingTask && <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
