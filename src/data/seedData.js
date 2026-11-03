export const users = [
  { id: 'a1', name: 'Prof. Meera Kapoor', role: 'admin' },
  { id: 'a2', name: 'Prof. Arjun Rao', role: 'admin' },
  { id: 's1', name: 'Aanya Sharma', role: 'student' },
  { id: 's2', name: 'Rohan Mehta', role: 'student' },
  { id: 's3', name: 'Priya Nair', role: 'student' },
  { id: 's4', name: 'Kabir Singh', role: 'student' },
  { id: 's5', name: 'Ishita Verma', role: 'student' },
]

export const seedAssignments = [
  {
    id: 1,
    title: 'React Component Lab',
    description: 'Build a reusable card component with props and state.',
    dueDate: '2026-11-12',
    driveLink: 'https://drive.google.com/drive/folders/react-lab',
    createdBy: 'a1',
    assignedTo: ['s1', 's2', 's3', 's4', 's5'],
  },
  {
    id: 2,
    title: 'DBMS ER Diagram',
    description: 'Draw an ER diagram for a library management system.',
    dueDate: '2026-10-30',
    driveLink: 'https://drive.google.com/drive/folders/er-diagram',
    createdBy: 'a1',
    assignedTo: ['s1', 's2', 's3'],
  },
  {
    id: 3,
    title: 'Algorithms Problem Set',
    description: 'Solve 5 problems on sorting and searching.',
    dueDate: '2026-11-08',
    driveLink: 'https://drive.google.com/drive/folders/algo-set',
    createdBy: 'a2',
    assignedTo: ['s1', 's2', 's3', 's4', 's5'],
  },
  {
    id: 4,
    title: 'Operating Systems Report',
    description: 'Write a 2-page report on process scheduling.',
    dueDate: '2026-11-20',
    driveLink: 'https://drive.google.com/drive/folders/os-report',
    createdBy: 'a2',
    assignedTo: ['s2', 's4', 's5'],
  },
  {
    id: 5,
    title: 'Web Dev Mini Project',
    description: 'Build a small responsive website using HTML, CSS and JS.',
    dueDate: '2026-11-25',
    driveLink: 'https://drive.google.com/drive/folders/web-project',
    createdBy: 'a1',
    assignedTo: ['s1', 's2', 's3', 's4', 's5'],
  },
  {
    id: 6,
    title: 'Data Structures Quiz Prep',
    description: 'Submit your notes on trees and graphs.',
    dueDate: '2026-11-05',
    driveLink: 'https://drive.google.com/drive/folders/ds-notes',
    createdBy: 'a2',
    assignedTo: ['s1', 's3', 's4', 's5'],
  },
]

export const seedSubmissions = [
  { assignmentId: 1, studentId: 's1', submittedAt: '2026-11-02' },
  { assignmentId: 1, studentId: 's2', submittedAt: '2026-11-01' },
  { assignmentId: 2, studentId: 's1', submittedAt: '2026-10-29' },
  { assignmentId: 3, studentId: 's3', submittedAt: '2026-11-02' },
  { assignmentId: 6, studentId: 's4', submittedAt: '2026-11-03' },
]