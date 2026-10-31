import type { TaskListProps } from '../../types';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onStatusChange, onEdit, onDelete }: TaskListProps) {
  // Show a message when there are no tasks to display.
  if (tasks.length === 0) {
    return <div className="empty">No tasks match your filters. Try changing your search or add a new task.</div>;
  }

  return (
    <div className="task-grid">
      {/* map() creates one TaskItem component for each task. */}
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
