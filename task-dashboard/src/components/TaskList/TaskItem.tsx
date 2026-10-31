import type { TaskItemProps, TaskStatus } from '../../types';
import { formatDate } from '../../utils/taskUtils';

export default function TaskItem({ task, onStatusChange, onEdit, onDelete }: TaskItemProps) {
  return (
    <article className="col-12 col-xl-6">
      <div className="card h-100 shadow-sm border-0"><div className="card-body">
      <div className="d-flex justify-content-between gap-2 align-items-start">
        <h3 className="h6 fw-bold">{task.title}</h3>
        <span className={`badge priority-${task.priority}`}>{task.priority}</span>
      </div>
      <p className="text-secondary small mt-3">{task.description}</p>
      <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap small">
        <span>Due: {formatDate(task.dueDate)}</span>
        <label>
          Status
          {/* Tell the parent dashboard which task changed and its new status. */}
          <select className="form-select form-select-sm" aria-label={`Status for ${task.title}`} value={task.status}
            onChange={event => onStatusChange(task.id, event.target.value as TaskStatus)}>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>
      <div className="d-flex gap-2 mt-3">
        {/* The parent handles editing and deleting; this card just sends the click. */}
        <button className="btn btn-outline-primary btn-sm" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
      </div></div>
    </article>
  );
}
