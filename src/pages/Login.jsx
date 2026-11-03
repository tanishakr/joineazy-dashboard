import useAuth from '../hooks/useAuth'
import { users } from '../data/seedData'

function UserButton({ user, onSelect }) {
  return (
    <button
      onClick={() => onSelect(user.id)}
      className="w-full text-left bg-surface border border-line rounded-xl p-4 hover:border-primary transition"
    >
      <p className="font-semibold">{user.name}</p>
      <p className="text-sm text-muted capitalize">{user.role}</p>
    </button>
  )
}

function Login() {
  const { login } = useAuth()

  const admins = users.filter((u) => u.role === 'admin')
  const students = users.filter((u) => u.role === 'student')

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-1">Welcome 👋</h2>
      <p className="text-muted mb-6">Pick a user to continue. No password needed.</p>

      <h3 className="text-lg font-semibold mb-3 text-primary">Professors</h3>
      <div className="grid gap-3 sm:grid-cols-2 mb-8">
        {admins.map((user) => (
          <UserButton key={user.id} user={user} onSelect={login} />
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-3 text-primary">Students</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {students.map((user) => (
          <UserButton key={user.id} user={user} onSelect={login} />
        ))}
      </div>
    </div>
  )
}

export default Login