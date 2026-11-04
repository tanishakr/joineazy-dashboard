// Is this due date before today? (dates are 'YYYY-MM-DD' text)
export function isOverdue(dueDate) {
  // 'en-CA' gives the format YYYY-MM-DD, using the user's local date
  const today = new Date().toLocaleDateString('en-CA')
  return dueDate < today
}

// Returns a new sorted list. sortBy is 'due-asc', 'due-desc' or 'title'
export function sortAssignments(list, sortBy) {
  const copy = [...list]

  if (sortBy === 'due-asc') {
    copy.sort((a, b) => a.dueDate.localeCompare(b.dueDate))
  } else if (sortBy === 'due-desc') {
    copy.sort((a, b) => b.dueDate.localeCompare(a.dueDate))
  } else if (sortBy === 'title') {
    copy.sort((a, b) => a.title.localeCompare(b.title))
  }

  return copy
}