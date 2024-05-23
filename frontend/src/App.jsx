import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import RootLayout from './layouts/RootLayout'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Projects from './pages/Projects'
import Help from './pages/Help'
import Services from './pages/Services'
import AddTaskScreen from './pages/AddTaskScreen'
import EditTaskScreen from './pages/EditTaskScreen'
import SingleTaskScreen from './pages/SingleTaskScreen'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/help' element={<Help />} />
            <Route path='/services' element={<Services />} />
            <Route path='/create' element={<AddTaskScreen />} />
            <Route path='/edit/:id' element={<EditTaskScreen />} />
            <Route path='/task/:id' element={<SingleTaskScreen />} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
