import { users } from '../data/seedData'
import formatDate from '../utils/formatDate'
import { isOverdue } from '../utils/assignmentHelpers'
import ProgressBar from './ProgressBar'

function AdminAssignmentCard({ assignment, submissions, onEdit, onDelete }) {
  // Turn the list of ids into a list of student objects, with their status
  const studentRows = assignment.assignedTo.map((studentId) => {
    const student = users.find((u) => u.id === studentId)
    const hasSubmitted = submissions.some(
      (s) => s.assignmentId === assignment.id && s.studentId === studentId
    )
    return { student, hasSubmitted }
  })

  const total = studentRows.length
  const submittedCount = studentRows.filter((row) => row.hasSubmitted).length
  const percent = total === 0 ? 0 : Math.round((submittedCount / total) * 100)

  const pastDue = isOverdue(assignment.dueDate)

  return (
    <div className="motion-safe:animate-fade-in bg-surface border border-line rounded-xl p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{assignment.title}</h3>
          <p className="text-sm text-muted">
            Due{' '}
            <span className={pastDue ? 'font-semibold text-primary' : ''}>
              {formatDate(assignment.dueDate)}
            </span>
            {pastDue && (
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary text-white">
                Past due
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => onEdit(assignment)}
            className="border border-line rounded-lg px-3 py-1.5 text-sm hover:bg-page"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(assignment)}
            className="border border-primary text-primary rounded-lg px-3 py-1.5 text-sm hover:bg-primary/10"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-muted">{assignment.description}</p>

      <a
        href={assignment.driveLink}
        target="_blank"
        rel="noreferrer"
        className="text-accent text-sm font-semibold hover:underline"
      >
        Open Drive link ↗
      </a>

      <div>
        <div className="flex justify-between text-sm mb-1">
          <p className="font-semibold">
            Class completion: {submittedCount} of {total}
          </p>
          <p className="text-muted">{percent}%</p>
        </div>
        <ProgressBar percent={percent} />
      </div>

      <ul className="grid sm:grid-cols-2 gap-2">
        {studentRows.map(({ student, hasSubmitted }) => (
          <li
            key={student.id}
            className="flex items-center justify-between gap-2 border border-line rounded-lg px-3 py-2 text-sm"
          >
            <span>{student.name}</span>
            <span
              className={
                hasSubmitted
                  ? 'text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/20 border border-accent'
                  : 'text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary'
              }
            >
              {hasSubmitted ? 'Submitted' : 'Not submitted'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminAssignmentCard