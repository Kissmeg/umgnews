import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Context } from '../Context/JSXContext';
import { useAuth } from '../Context/useAuth';
const Sidemenu = () => {
    
    const {logout} = useAuth();
    const {setSelectedMenu, selectedMenu} = useContext(Context);
    console.log(selectedMenu);
    
  return (
    <div className=''>
      <div className='p-4 '>
        <div>
          <p className='cursor-pointer text-2xl hover:text-neutral-600 hover:translate-x-4 ease-in-out transition-all' onClick={()=>setSelectedMenu('mainDash')}>Dashboard</p>
        </div>
        <div className='mt-2'>
          <p className='cursor-pointer text-2xl hover:text-neutral-600 hover:translate-x-4 ease-in-out transition-all' onClick={()=>setSelectedMenu('createArticle')}>Create Article</p>
        </div>
        <div className='mt-2'>
          <p className='cursor-pointer text-2xl hover:text-neutral-600 hover:translate-x-4 ease-in-out transition-all' onClick={()=>setSelectedMenu('readArticle')}>Read Articles</p>
        </div>
        <div className='self-end text-red-500  mt-8'>
          <p className='cursor-pointer text-2xl hover:text-red-700 hover:translate-x-4 ease-in-out transition-all' onClick={()=>logout()}>Log Out</p>
        </div>
      </div>
    </div>
  )
}

export default Sidemenu
