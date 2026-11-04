import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import useData from '../hooks/useData'
import AssignmentCard from '../components/AssignmentCard'
import ConfirmModal from '../components/ConfirmModal'
import ProgressBar from '../components/ProgressBar'
import LoadingSkeleton from '../components/LoadingSkeleton'
import FilterBar from '../components/FilterBar'
import { isOverdue, sortAssignments } from '../utils/assignmentHelpers'

const statusOptions = [
  { value: 'all', label: 'All assignments' },
  { value: 'pending', label: 'Not submitted' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'overdue', label: 'Overdue' },
]

function StudentDashboard() {
  const { currentUser } = useAuth()
  const { assignments, submissions, isLoading, markSubmitted } = useData()

  // Which assignment is waiting for the final confirmation? (null = none)
  const [assignmentToConfirm, setAssignmentToConfirm] = useState(null)

  // Search, filter and sort choices
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('due-asc')

  // Still loading? Show placeholders instead of the real page
  if (isLoading) {
    return <LoadingSkeleton />
  }

  // Only the assignments given to this student
  const myAssignments = assignments.filter((a) =>
    a.assignedTo.includes(currentUser.id)
  )

  // Find this student's submission for one assignment (or undefined)
  function findSubmission(assignmentId) {
    return submissions.find(
      (s) => s.assignmentId === assignmentId && s.studentId === currentUser.id
    )
  }

  // Progress is always calculated from ALL of my assignments, not the filtered ones
  const total = myAssignments.length
  const submittedCount = myAssignments.filter((a) => findSubmission(a.id)).length
  const percent = total === 0 ? 0 : Math.round((submittedCount / total) * 100)

  // Step 1: keep only the assignments that match the search and status filter
  const matchingAssignments = myAssignments.filter((a) => {
    const matchesSearch = a.title
      .toLowerCase()
      .includes(search.toLowerCase().trim())

    const submitted = Boolean(findSubmission(a.id))
    let matchesStatus = true
    if (status === 'submitted') matchesStatus = submitted
    if (status === 'pending') matchesStatus = !submitted
    if (status === 'overdue') matchesStatus = !submitted && isOverdue(a.dueDate)

    return matchesSearch && matchesStatus
  })

  // Step 2: sort what is left
  const visibleAssignments = sortAssignments(matchingAssignments, sort)

  function clearFilters() {
    setSearch('')
    setStatus('all')
  }

  function handleConfirm() {
    markSubmitted(assignmentToConfirm.id, currentUser.id)
    setAssignmentToConfirm(null)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold">My Assignments</h2>
      <p className="text-muted mb-6">Hello, {currentUser.name}</p>

      <div className="bg-surface border border-line rounded-xl p-4 sm:p-5 mb-6">
        <div className="flex justify-between mb-2">
          <p className="font-semibold">
            {submittedCount} of {total} submitted
          </p>
          <p className="text-muted">{percent}%</p>
        </div>
        <ProgressBar percent={percent} />
      </div>

      {total === 0 ? (
        <div className="text-center bg-surface border border-line rounded-xl p-10">
          <p className="text-lg font-semibold">No assignments yet 🎉</p>
          <p className="text-muted">Your professors haven't assigned anything to you.</p>
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
            <div className="grid gap-4 md:grid-cols-2">
              {visibleAssignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  submission={findSubmission(assignment.id)}
                  onSubmitClick={setAssignmentToConfirm}
                />
              ))}
            </div>
          )}
        </>
      )}

      {assignmentToConfirm && (
        <ConfirmModal
          title="Confirm submission"
          message={`Have you really submitted "${assignmentToConfirm.title}"? This can't be undone.`}
          onConfirm={handleConfirm}
          onCancel={() => setAssignmentToConfirm(null)}
        />
      )}
    </div>
  )
}

export default StudentDashboard