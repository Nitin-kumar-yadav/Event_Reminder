import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './screen/Home'
import Login from './screen/Login'
import Signup from './screen/Signup'
import Dashboard from './screen/Dashboard'
import Navigation from './screen/Navigation'
import { useThemeStore } from './store/themeStore'

const App = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />

      </Routes>
    </div>
  )
}

export default App