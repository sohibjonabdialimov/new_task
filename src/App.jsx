import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import AddUser from './pages/addUser/AddUser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='add-user' element={<AddUser />} />        
      </Routes>
    </>
  )
}

export default App
