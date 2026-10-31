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
    <section className="card shadow-sm border-0 p-3 p-md-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="h5 mb-0">Find tasks</h2>
        <span className="badge text-bg-info">{activeFilters} active filter{activeFilters === 1 ? '' : 's'}</span>
      </div>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold small mb-1" htmlFor="search">Search</label>
          {/* Spread keeps the other filter values when search changes. */}
          <input className="form-control" id="search" placeholder="Search title or description" value={filters.search}
            onChange={event => onFiltersChange({ ...filters, search: event.target.value })} />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold small mb-1" htmlFor="filterStatus">Status</label>
          <select className="form-select" id="filterStatus" value={filters.status}
            onChange={event => onFiltersChange({ ...filters, status: event.target.value as TaskStatus | 'all' })}>
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold small mb-1" htmlFor="filterPriority">Priority</label>
          <select className="form-select" id="filterPriority" value={filters.priority}
            onChange={event => onFiltersChange({ ...filters, priority: event.target.value as TaskPriority | 'all' })}>
            <option value="all">All priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold small mb-1" htmlFor="sort">Sort by</label>
          <select className="form-select" id="sort" value={sortBy} onChange={event => onSortChange(event.target.value as SortOption)}>
            <option value="dueDate">Due date (earliest)</option>
            <option value="priority">Priority (highest)</option>
            <option value="title">Title (A–Z)</option>
          </select>
        </div>
      </div>
      {activeFilters > 0 && <button className="btn btn-outline-secondary btn-sm mt-3" onClick={clearFilters}>Clear filters</button>}
    </section>
  );
}
