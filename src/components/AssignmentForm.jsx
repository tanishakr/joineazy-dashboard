import { useState } from 'react'
import { users } from '../data/seedData'

function AssignmentForm({ assignment, onSave, onCancel }) {
  const students = users.filter((u) => u.role === 'student')

  // If we're editing, start with the existing values. If creating, start empty.
  const [title, setTitle] = useState(assignment?.title || '')
  const [description, setDescription] = useState(assignment?.description || '')
  const [dueDate, setDueDate] = useState(assignment?.dueDate || '')
  const [driveLink, setDriveLink] = useState(assignment?.driveLink || '')
  const [assignedTo, setAssignedTo] = useState(assignment?.assignedTo || [])
  const [error, setError] = useState('')

  const allSelected = assignedTo.length === students.length

  function toggleStudent(studentId) {
    if (assignedTo.includes(studentId)) {
      setAssignedTo(assignedTo.filter((id) => id !== studentId))
    } else {
      setAssignedTo([...assignedTo, studentId])
    }
  }

  function toggleAll() {
    if (allSelected) {
      setAssignedTo([])
    } else {
      setAssignedTo(students.map((s) => s.id))
    }
  }

  function handleSubmit(e) {
    e.preventDefault() // stop the browser from reloading the page

    if (!title.trim()) return setError('Title is required.')
    if (!dueDate) return setError('Due date is required.')
    if (!driveLink.startsWith('http')) {
      return setError('Drive link must start with http:// or https://')
    }
    if (assignedTo.length === 0) return setError('Select at least one student.')

    onSave({
      title: title.trim(),
      description: description.trim(),
      dueDate,
      driveLink: driveLink.trim(),
      assignedTo,
    })
  }

  const inputStyle =
    'w-full bg-page border border-line rounded-lg px-3 py-2 focus:outline-none focus:border-primary'

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-line rounded-xl p-5 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-xl font-bold mb-4">
          {assignment ? 'Edit assignment' : 'New assignment'}
        </h3>

        <label htmlFor="title" className="block text-sm font-semibold mb-1">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputStyle + ' mb-3'}
        />

        <label htmlFor="description" className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          id="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputStyle + ' mb-3'}
        />

        <label htmlFor="dueDate" className="block text-sm font-semibold mb-1">Due date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={inputStyle + ' mb-3'}
        />

        <label htmlFor="driveLink" className="block text-sm font-semibold mb-1">Drive link</label>
        <input
          id="driveLink"
          type="url"
          placeholder="https://drive.google.com/..."
          value={driveLink}
          onChange={(e) => setDriveLink(e.target.value)}
          className={inputStyle + ' mb-4'}
        />

        <p className="text-sm font-semibold mb-2">Assign to</p>
        <label className="flex items-center gap-2 mb-2 font-semibold">
          <input type="checkbox" checked={allSelected} onChange={toggleAll} />
          All students
        </label>
        <div className="grid sm:grid-cols-2 gap-2 mb-4">
          {students.map((student) => (
            <label key={student.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={assignedTo.includes(student.id)}
                onChange={() => toggleStudent(student.id)}
              />
              {student.name}
            </label>
          ))}
        </div>

        {error && <p className="text-primary text-sm mb-3" role="alert">{error}</p>}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="border border-line rounded-lg px-4 py-2 hover:bg-page"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover text-white rounded-lg px-4 py-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default AssignmentForm