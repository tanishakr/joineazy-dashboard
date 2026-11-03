import useAuth from './hooks/useAuth'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  const { currentUser } = useAuth()

  let page
  if (!currentUser) {
    page = <Login />
  } else if (currentUser.role === 'admin') {
    page = <AdminDashboard />
  } else {
    page = <StudentDashboard />
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      {page}
    </div>
  )
}

export default App