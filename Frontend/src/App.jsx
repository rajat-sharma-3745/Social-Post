import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './Pages/Home/Home'
import { useAppContext } from './context/AppContext'
import Login from './Pages/Login/Login';

function App() {
  const {user} = useAppContext();
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: (
        <ProtectedRoute user={!user} redirect="/">
          <Login />
        </ProtectedRoute>
      ),
    },
    {
      path: "/",
      element: (
        <ProtectedRoute user={user}>
          <Home />
        </ProtectedRoute>
      ),
    }
  ])
  return <RouterProvider router={router}/>
}

export default App
