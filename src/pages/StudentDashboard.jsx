import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import useData from '../hooks/useData'
import AssignmentCard from '../components/AssignmentCard'
import ConfirmModal from '../components/ConfirmModal'
import ProgressBar from '../components/ProgressBar'

function StudentDashboard() {
  const { currentUser } = useAuth()
  const { assignments, submissions, markSubmitted } = useData()

  // Which assignment is waiting for the final confirmation? (null = none)
  const [assignmentToConfirm, setAssignmentToConfirm] = useState(null)

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

  const total = myAssignments.length
  const submittedCount = myAssignments.filter((a) => findSubmission(a.id)).length
  const percent = total === 0 ? 0 : Math.round((submittedCount / total) * 100)

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
        <div className="grid gap-4 md:grid-cols-2">
          {myAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              submission={findSubmission(assignment.id)}
              onSubmitClick={setAssignmentToConfirm}
            />
          ))}
        </div>
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