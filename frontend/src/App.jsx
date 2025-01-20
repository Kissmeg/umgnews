import { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Testinput from './Components/testinput'
import News from './Components/News'
import Category from './Pages/Category'

function App() {
  

  return (
    <div className='flex justify-center '>
      <div className='lg:w-[62%]'>
        <Navbar/>
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/test'} element={<Testinput/>}/>
          <Route path={'/news/:_id'} element={<News/>}/>
          <Route path={'/:category'} element={<Category/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
