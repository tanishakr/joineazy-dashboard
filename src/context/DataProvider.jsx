import { useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { DataContext } from './DataContext'
import { seedAssignments, seedSubmissions } from '../data/seedData'

export function DataProvider({ children }) {
  const [assignments, setAssignments] = useLocalStorage('assignments', seedAssignments)
  const [submissions, setSubmissions] = useLocalStorage('submissions', seedSubmissions)

  // Simulated loading: starts true, becomes false after a short delay
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(timer)
  }, [])

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
    isLoading,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    markSubmitted,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}