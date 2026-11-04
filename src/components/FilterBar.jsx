function FilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  statusOptions,
  sort,
  onSortChange,
}) {
  const controlStyle =
    'w-full bg-surface border border-line rounded-lg px-3 py-2 focus:outline-none focus:border-primary'

  return (
    <div className="grid gap-3 sm:grid-cols-3 mb-6">
      <input
        type="search"
        aria-label="Search assignments by title"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className={controlStyle}
      />

      <select
        aria-label="Filter by status"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className={controlStyle}
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        aria-label="Sort assignments"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className={controlStyle}
      >
        <option value="due-asc">Due date: soonest first</option>
        <option value="due-desc">Due date: latest first</option>
        <option value="title">Title: A to Z</option>
      </select>
    </div>
  )
}

export default FilterBar