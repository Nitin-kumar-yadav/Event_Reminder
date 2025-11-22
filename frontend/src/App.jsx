import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './screen/Home'
import Login from './screen/Login'
import Signup from './screen/Signup'
import Dashboard from './screen/Dashboard'
import Navigation from './screen/Navigation'
import { useThemeStore } from './store/themeStore'
import toast, { Toaster } from 'react-hot-toast';
import { useUserAuthStore } from './store/userAuthStore'
import Loader from './components/Loader'

const App = () => {
  const { theme } = useThemeStore();
  const { isChecking, authUser, checkAuth } = useUserAuthStore();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    checkAuth()
  }, [theme]);

  if (isChecking) return <Loader />;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navigation />
      <Routes>
        <Route path='/' element={authUser ? <Dashboard /> : <Home />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to={'/'} />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to={'/'} />} />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={true} toastOptions={{
        duration: 5000,

      }} />
    </div>
  )
}

export default App