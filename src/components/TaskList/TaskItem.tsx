import type { TaskItemProps, TaskStatus } from '../../types';
import { formatDate } from '../../utils/taskUtils';

export default function TaskItem({ task, onStatusChange, onEdit, onDelete }: TaskItemProps) {
  return (
    <article className="task-card">
      <div className="task-top">
        <h3>{task.title}</h3>
        <span className={`priority ${task.priority}`}>{task.priority}</span>
      </div>
      <p>{task.description}</p>
      <div className="task-meta">
        <span>Due: {formatDate(task.dueDate)}</span>
        <label>
          Status
          {/* Tell the parent dashboard which task changed and its new status. */}
          <select aria-label={`Status for ${task.title}`} value={task.status}
            onChange={event => onStatusChange(task.id, event.target.value as TaskStatus)}>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>
      <div className="task-actions">
        {/* The parent handles editing and deleting; this card just sends the click. */}
        <button className="secondary" onClick={() => onEdit(task)}>Edit</button>
        <button className="danger" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </article>
  );
}
