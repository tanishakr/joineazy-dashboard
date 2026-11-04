import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import useData from '../hooks/useData'
import AdminAssignmentCard from '../components/AdminAssignmentCard'
import AssignmentForm from '../components/AssignmentForm'
import ConfirmModal from '../components/ConfirmModal'
import LoadingSkeleton from '../components/LoadingSkeleton'
import FilterBar from '../components/FilterBar'
import { isOverdue, sortAssignments } from '../utils/assignmentHelpers'

const statusOptions = [
  { value: 'all', label: 'All assignments' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past-due', label: 'Past due' },
]

function AdminDashboard() {
  const { currentUser } = useAuth()
  const {
    assignments,
    submissions,
    isLoading,
    addAssignment,
    updateAssignment,
    deleteAssignment,
  } = useData()

  const [showForm, setShowForm] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState(null) // null = creating new
  const [assignmentToDelete, setAssignmentToDelete] = useState(null)

  // Search, filter and sort choices
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('due-asc')

  // Still loading? Show placeholders instead of the real page
  if (isLoading) {
    return <LoadingSkeleton />
  }

  // Admins only see assignments they created
  const myAssignments = assignments.filter((a) => a.createdBy === currentUser.id)

  // Step 1: keep only the assignments that match the search and status filter
  const matchingAssignments = myAssignments.filter((a) => {
    const matchesSearch = a.title
      .toLowerCase()
      .includes(search.toLowerCase().trim())

    let matchesStatus = true
    if (status === 'past-due') matchesStatus = isOverdue(a.dueDate)
    if (status === 'upcoming') matchesStatus = !isOverdue(a.dueDate)

    return matchesSearch && matchesStatus
  })

  // Step 2: sort what is left
  const visibleAssignments = sortAssignments(matchingAssignments, sort)

  function clearFilters() {
    setSearch('')
    setStatus('all')
  }

  function openCreateForm() {
    setEditingAssignment(null)
    setShowForm(true)
  }

  function openEditForm(assignment) {
    setEditingAssignment(assignment)
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingAssignment(null)
  }

  function handleSave(formData) {
    if (editingAssignment) {
      updateAssignment(editingAssignment.id, formData)
    } else {
      addAssignment({ ...formData, createdBy: currentUser.id })
    }
    closeForm()
  }

  function handleDelete() {
    deleteAssignment(assignmentToDelete.id)
    setAssignmentToDelete(null)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">My Assignments</h2>
          <p className="text-muted">
            {currentUser.name} · {myAssignments.length} created
          </p>
        </div>
        <button
          onClick={openCreateForm}
          className="bg-primary hover:bg-primary-hover text-white rounded-lg px-4 py-2 font-semibold"
        >
          + New assignment
        </button>
      </div>

      {myAssignments.length === 0 ? (
        <div className="text-center bg-surface border border-line rounded-xl p-10">
          <p className="text-lg font-semibold">No assignments created yet</p>
          <p className="text-muted">Click "New assignment" to create your first one.</p>
        </div>
      ) : (
        <>
          <FilterBar
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            statusOptions={statusOptions}
            sort={sort}
            onSortChange={setSort}
          />

          {visibleAssignments.length === 0 ? (
            <div className="text-center bg-surface border border-line rounded-xl p-10">
              <p className="text-lg font-semibold">No assignments match your filters</p>
              <button
                onClick={clearFilters}
                className="mt-3 border border-line rounded-lg px-4 py-2 hover:bg-page"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {visibleAssignments.map((assignment) => (
                <AdminAssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  submissions={submissions}
                  onEdit={openEditForm}
                  onDelete={setAssignmentToDelete}
                />
              ))}
            </div>
          )}
        </>
      )}

      {showForm && (
        <AssignmentForm
          assignment={editingAssignment}
          onSave={handleSave}
          onCancel={closeForm}
        />
      )}

      {assignmentToDelete && (
        <ConfirmModal
          title="Delete assignment"
          message={`Delete "${assignmentToDelete.title}"? Students will no longer see it and all its submissions will be removed.`}
          confirmText="Delete"
          onConfirm={handleDelete}
          onCancel={() => setAssignmentToDelete(null)}
        />
      )}
    </div>
  )
}

export default AdminDashboard