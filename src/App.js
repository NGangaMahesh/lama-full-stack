import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Episode from './pages/Episode/Episode'


const App = () => {


  return (
    <div>
      <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/episode/:id' element={<Episode />} />
        </Routes>
    </div>
  )
}

export default App
