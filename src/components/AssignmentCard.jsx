import formatDate from '../utils/formatDate'

function AssignmentCard({ assignment, submission, onSubmitClick }) {
  const isSubmitted = Boolean(submission)

  return (
    <div className="bg-surface border border-line rounded-xl p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold">{assignment.title}</h3>

        {isSubmitted ? (
          <span className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full bg-accent/20 text-ink border border-accent">
            Submitted
          </span>
        ) : (
          <span className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary">
            Not submitted
          </span>
        )}
      </div>

      <p className="text-muted">{assignment.description}</p>

      <p className="text-sm">
        <span className="text-muted">Due: </span>
        <span className="font-semibold">{formatDate(assignment.dueDate)}</span>
      </p>

      {isSubmitted && (
        <p className="text-sm text-muted">
          Submitted on {formatDate(submission.submittedAt)}
        </p>
      )}

      <div className="flex flex-wrap gap-3 mt-1">
        <a
          href={assignment.driveLink}
          target="_blank"
          rel="noreferrer"
          className="border border-accent text-accent rounded-lg px-4 py-2 text-sm font-semibold hover:bg-accent/10"
        >
          Open Drive link ↗
        </a>

        {!isSubmitted && (
          <button
            onClick={() => onSubmitClick(assignment)}
            className="bg-primary hover:bg-primary-hover text-white rounded-lg px-4 py-2 text-sm font-semibold"
          >
            Yes, I have submitted
          </button>
        )}
      </div>
    </div>
  )
}

export default AssignmentCard