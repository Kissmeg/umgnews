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
{/*
ssh-keygen -R 147.93.113.90

   nano /etc/nginx/sites-available/umgnews.com.conf
  
   server {
    listen 80;
    server_name umgnews.com www.umgnews.com;

    location / {
        root /var/www/umgnews/frontend/dist;
        try_files $uri /index.html;
    }
  }
  

   nano /etc/nginx/sites-available/admin.umgnews.com.conf

   server {
    listen 80;
    server_name admin.umgnews.com;

    location / {
        root /var/www/umgnews/admin/dist;
        try_files $uri /index.html;
    }
  }


  ln -s /etc/nginx/sites-available/umgnews.com.conf /etc/nginx/sites-enabled/

  ln -s /etc/nginx/sites-available/admin.umgnews.com.conf /etc/nginx/sites-enabled/

  certbot --nginx -d umgnews.com -d www.umgnews.com -d admin.umgnews.com
  certbot --nginx -d umgnews.com -d www.umgnews.com -d admin.umgnews.com 
  kontrash297@gmail.com
  */}