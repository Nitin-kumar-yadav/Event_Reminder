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
  }, [theme, checkAuth]);

  if (isChecking) return <Loader />;
  let width = window.innerWidth;
  if (width < 768) {
    toast.error('Please switch to desktop view')
    return <div>
      <h1 className='text-white text-2xl font-bold text-center mt-10'>Please switch to desktop view</h1>
    </div>
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navigation />
      <Routes>
        <Route path='/' element={authUser ? <Dashboard /> : <Navigate to={'/login'} />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to={'/'} />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to={'/'} />} />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  )
}

export default App