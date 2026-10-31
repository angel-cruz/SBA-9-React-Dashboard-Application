import type { TaskFilterProps, TaskPriority, TaskStatus, SortOption } from '../../types';

export default function TaskFilter({ filters, sortBy, onFiltersChange, onSortChange }: TaskFilterProps) {
  // Count how many filters are currently being used (sorting does not count).
  let activeFilters = 0;
  if (filters.status !== 'all') activeFilters++;
  if (filters.priority !== 'all') activeFilters++;
  if (filters.search.trim() !== '') activeFilters++;

  function clearFilters() {
    // Reset the search and dropdowns to show all tasks again.
    onFiltersChange({ status: 'all', priority: 'all', search: '' });
  }

  return (
    <section className="panel filters">
      <div className="section-heading">
        <h2>Find tasks</h2>
        <span>{activeFilters} active filter{activeFilters === 1 ? '' : 's'}</span>
      </div>
      <div className="filter-grid">
        <div>
          <label htmlFor="search">Search</label>
          {/* Spread keeps the other filter values when search changes. */}
          <input id="search" placeholder="Search title or description" value={filters.search}
            onChange={event => onFiltersChange({ ...filters, search: event.target.value })} />
        </div>
        <div>
          <label htmlFor="filterStatus">Status</label>
          <select id="filterStatus" value={filters.status}
            onChange={event => onFiltersChange({ ...filters, status: event.target.value as TaskStatus | 'all' })}>
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="filterPriority">Priority</label>
          <select id="filterPriority" value={filters.priority}
            onChange={event => onFiltersChange({ ...filters, priority: event.target.value as TaskPriority | 'all' })}>
            <option value="all">All priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort">Sort by</label>
          <select id="sort" value={sortBy} onChange={event => onSortChange(event.target.value as SortOption)}>
            <option value="dueDate">Due date (earliest)</option>
            <option value="priority">Priority (highest)</option>
            <option value="title">Title (A–Z)</option>
          </select>
        </div>
      </div>
      {activeFilters > 0 && <button className="secondary clear" onClick={clearFilters}>Clear filters</button>}
    </section>
  );
}
