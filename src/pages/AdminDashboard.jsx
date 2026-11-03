import useAuth from '../hooks/useAuth'

function AdminDashboard() {
  const { currentUser } = useAuth()

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <p className="text-muted">Hello, {currentUser.name}</p>
    </div>
  )
}

export default AdminDashboard