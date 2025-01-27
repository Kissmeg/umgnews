import { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import News from './Components/News'
import Category from './Pages/Category'
import Footer from './Components/Footer'
import Policy from './Pages/Policy'
import FAQ from './Pages/FAQ'
import Contact from './Pages/Contact'
import Notfound from './Pages/Notfound'
import Categories from './Pages/Categories'
function App() {
  

  return (
    <div className='flex justify-center '>
      <div className='lg:w-[80%] xl:w-[62%] w-full'>
        <Navbar/>
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/news/:headingslug/:id'} element={<News/>}/>
          <Route path={'category/:category'} element={<Category/>}/>
          <Route path={'/policy'} element={<Policy/>}/>
          <Route path={'/faq'} element={<FAQ/>}/>
          <Route path={'/contact'} element={<Contact/>}/>
          <Route path={'/*'} element={<Notfound/>}/>
          <Route path={'/category'} element={<Categories/>}/>
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
