import useLocalStorage from '../hooks/useLocalStorage'
import { DataContext } from './DataContext'
import { seedAssignments, seedSubmissions } from '../data/seedData'

export function DataProvider({ children }) {
  const [assignments, setAssignments] = useLocalStorage('assignments', seedAssignments)
  const [submissions, setSubmissions] = useLocalStorage('submissions', seedSubmissions)

  function addAssignment(newAssignment) {
    setAssignments((prev) => [...prev, { ...newAssignment, id: Date.now() }])
  }

  function updateAssignment(id, changes) {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...changes } : a))
    )
  }

  function deleteAssignment(id) {
    setAssignments((prev) => prev.filter((a) => a.id !== id))
    setSubmissions((prev) => prev.filter((s) => s.assignmentId !== id))
  }

  function markSubmitted(assignmentId, studentId) {
    const alreadySubmitted = submissions.some(
      (s) => s.assignmentId === assignmentId && s.studentId === studentId
    )
    if (alreadySubmitted) return

    const newSubmission = {
      assignmentId,
      studentId,
      submittedAt: new Date().toISOString().slice(0, 10),
    }
    setSubmissions((prev) => [...prev, newSubmission])
  }

  const value = {
    assignments,
    submissions,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    markSubmitted,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}