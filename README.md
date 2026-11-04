# Joineazy: Assignment & Review Dashboard

A responsive dashboard for a student-assignment system with two roles: **Student** and **Admin (Professor)**. Built for the Joineazy Frontend Intern Assignment (Task 1).

- **Live demo:** https://joineazy-dashboard-one.vercel.app/
- **Repository:** https://github.com/tanishakr/joineazy-dashboard

## Features

### Must-have
- **Mock login / role switcher** with 7 seeded users (2 professors, 5 students). No real authentication.
- **Student view**
  - Only the assignments given to that student
  - Title, description, due date, status and Drive link for each
  - Two-step submission: "Yes, I have submitted" → final confirmation dialog → status becomes Submitted
  - Overall progress indicator (for example "2 of 5 submitted") with a progress bar
- **Admin view**
  - Create, edit and delete assignments, including a Drive link
  - Assign to all students or to selected students
  - Only the assignments that professor created
  - Every assigned student's status (submitted / not submitted) and a class completion progress bar
- **Responsive** on mobile, tablet and desktop
- **Persistence:** all data is saved in `localStorage` and survives a page refresh
- **Empty, loading and error states** on both dashboards

### Bonus
- Dark mode (saved between visits)
- Overdue highlighting (student) and past-due badge (admin)
- Search by title, filter by status, and sorting by due date or title
- Small animations (fade-in cards, animated progress bar), disabled for users who prefer reduced motion
- Accessibility basics: labelled form controls, ARIA labels and roles, visible keyboard focus outline

## Tech stack
- React 19 (hooks, Context API)
- Tailwind CSS 4 (via the Vite plugin)
- Vite
- ESLint
- No backend: JSON seed data + `localStorage`

## Setup

Requires Node.js 18 or newer.

```bash
git clone https://github.com/YOUR-USERNAME/joineazy-dashboard.git
cd joineazy-dashboard
npm install
npm run dev
```

Then open the local URL printed in the terminal (usually http://localhost:5173).

Other commands:

```bash
npm run build     # production build into /dist
npm run preview   # preview the production build
npm run lint      # run ESLint
```

### Seeded users

| ID | Name | Role |
|----|------|------|
| a1 | Prof. Meera Kapoor | Admin |
| a2 | Prof. Arjun Rao | Admin |
| s1 | Aanya Sharma | Student |
| s2 | Rohan Mehta | Student |
| s3 | Priya Nair | Student |
| s4 | Kabir Singh | Student |
| s5 | Ishita Verma | Student |

Pick any user on the login page. No password is needed.

To reset the app to its original data, run `localStorage.clear()` in the browser console and refresh.

## Folder structure

```
src/
├── components/            Reusable UI pieces
│   ├── AdminAssignmentCard.jsx
│   ├── AssignmentCard.jsx
│   ├── AssignmentForm.jsx
│   ├── ConfirmModal.jsx
│   ├── ErrorBoundary.jsx
│   ├── FilterBar.jsx
│   ├── LoadingSkeleton.jsx
│   ├── Navbar.jsx
│   └── ProgressBar.jsx
├── context/               Shared app state (Context API)
│   ├── AuthContext.js
│   ├── AuthProvider.jsx
│   ├── DataContext.js
│   └── DataProvider.jsx
├── data/
│   └── seedData.js        Seeded users, assignments and submissions
├── hooks/                 Custom hooks
│   ├── useAuth.js
│   ├── useData.js
│   ├── useLocalStorage.js
│   └── useTheme.js
├── pages/                 One component per screen
│   ├── AdminDashboard.jsx
│   ├── Login.jsx
│   └── StudentDashboard.jsx
├── utils/                 Plain helper functions
│   ├── assignmentHelpers.js
│   └── formatDate.js
├── App.jsx                Chooses which page to show
├── index.css              Tailwind setup and light/dark theme colours
└── main.jsx               Entry point, wraps the app in providers
```

## Component architecture

```
main.jsx
└── ErrorBoundary
    └── AuthProvider          (who is logged in)
        └── DataProvider      (assignments, submissions, actions)
            └── App
                ├── Navbar
                └── one of:
                    ├── Login
                    ├── StudentDashboard
                    │   ├── ProgressBar
                    │   ├── FilterBar
                    │   ├── AssignmentCard (one per assignment)
                    │   └── ConfirmModal
                    └── AdminDashboard
                        ├── FilterBar
                        ├── AdminAssignmentCard (one per assignment)
                        │   └── ProgressBar
                        ├── AssignmentForm (create / edit)
                        └── ConfirmModal (delete)
```

**How the pieces fit together**

- **Pages** (`pages/`) own the state for their screen: which popup is open, the search text, and so on. They fetch data from context and pass it down as props.
- **Presentational components** (`AssignmentCard`, `ProgressBar`, `FilterBar`, ...) only display what they receive and report user actions through callback props such as `onSubmitClick` and `onEdit`. They never change app data themselves.
- **Context** holds the data that many components need. `AuthProvider` exposes `currentUser`, `login` and `logout`. `DataProvider` exposes the assignments, the submissions and the functions that change them (`addAssignment`, `updateAssignment`, `deleteAssignment`, `markSubmitted`).
- **Custom hooks** keep logic reusable: `useLocalStorage` (state that persists), `useTheme` (dark mode), and `useAuth` / `useData` (shortcuts to read context).
- **Reused components:** `ConfirmModal` serves both the student's submission confirmation and the admin's delete confirmation. `ProgressBar` serves both dashboards. `FilterBar` serves both dashboards with different status options.

## Key design decisions

**1. Data model: three separate lists.**
Users are fixed in code. Assignments and submissions are stored separately in `localStorage`. A student has submitted an assignment if a `{ assignmentId, studentId }` row exists in the submissions list. This keeps assignments clean and makes the admin's "who has submitted?" view a simple lookup.

**2. "All students" and "selected students" use the same field.**
Each assignment stores `assignedTo`, an array of student ids. "All students" simply means the array contains every student. There is no special case in the code.

**3. Data privacy through filtering.**
Students see `assignments.filter(a => a.assignedTo.includes(currentUser.id))`. Admins see `assignments.filter(a => a.createdBy === currentUser.id)`. A student's submission is matched on both the assignment and the student id, so one student's submission never shows for another.

**4. Context API instead of a state library.**
The app has two small pieces of shared state (auth and data), so built-in Context is enough. Components call `useAuth()` and `useData()` instead of passing props through many levels.

**5. No router.**
The app has three screens chosen by one condition (not logged in / admin / student), so a single `if` in `App.jsx` is simpler than adding React Router.

**6. Two-step confirmation held in one piece of state.**
The student page keeps `assignmentToConfirm`. Clicking "Yes, I have submitted" sets it, which opens the dialog. Confirming saves the submission and clears it. Cancelling just clears it.

**7. Theming with semantic colour tokens.**
Colours are named by their job (`page`, `surface`, `ink`, `primary`, `accent`) as CSS variables, with one set of values for light mode and another for dark mode. Components use classes like `bg-surface` and `text-primary` and never need `dark:` prefixes. The palette is based on cream, navy, crimson, maroon and sky blue.

**8. Derived data is computed, not stored.**
Progress percentages, filtered lists and sorted lists are calculated from the source data on each render. There is no duplicate state to keep in sync.

**9. Simulated loading state.**
`localStorage` is instant, so the loading skeleton is shown for a short fixed delay to mimic an API call. The UI is ready to show real loading when a real API replaces `localStorage`.

**10. Error handling.**
`useLocalStorage` falls back to the seed data if saved JSON can't be parsed. An `ErrorBoundary` catches rendering crashes (for example, saved data with the wrong shape) and offers a "Reset data" button. Forms validate their input and show inline messages.

**11. Accessibility.**
Form inputs have linked labels, icon-only buttons have `aria-label`, dialogs and progress bars use ARIA roles, and a visible focus outline appears for keyboard users. Animations respect the "reduce motion" setting.

## Known limitations
- **Data is per browser.** `localStorage` is not shared between devices or users. Each visitor starts from the seed data.
- **No real authentication.** The login screen is a role switcher by design.
- **No automated tests and no TypeScript** yet.
- **Dialogs** close with their buttons but not yet with the Escape key, and focus is not trapped inside them.

## Possible next steps
- Replace `localStorage` with a real API
- Escape-to-close and focus trapping for dialogs
- Unit tests for the helper functions and key components
- TypeScript migration