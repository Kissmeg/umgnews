import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Context } from '../Context/JSXContext';
import { useAuth } from '../Context/useAuth';
import { assets } from '../assets/assets';
const Sidemenu = () => {
    
    const {logout} = useAuth();
    const {setSelectedMenu, selectedMenu} = useContext(Context);
    console.log(selectedMenu);
    
  return (
    <div className=''>
      <div className='hidden lg:block p-4 '>
        <div className='flex w-fit cursor-pointer items-center group hover:translate-x-4 ease-in-out transition-all'>
          <img className=' ease-in-out transition-all w-8 h-8 mr-2' src={assets.dashboard} alt="" />
          <p className='cursor-pointer lg:text-xl group-hover:text-neutral-600  ease-in-out transition-all' onClick={()=>setSelectedMenu('mainDash')}>Dashboard</p>
        </div>
        <div className='mt-4 flex w-fit cursor-pointer items-center group hover:translate-x-4 ease-in-out transition-all'>
          <img className='w-8 h-8 ease-in-out transition-all' src={assets.tableadd} alt="" />
          <p className='cursor-pointer lg:text-xl hover:text-neutral-600  ease-in-out transition-all' onClick={()=>setSelectedMenu('createArticle')}>Create Article</p>
        </div>
        <div className='mt-4 flex w-fit cursor-pointer items-center group hover:translate-x-4 ease-in-out transition-all'>
          <img className='w-8 h-8  ease-in-out transition-all' src={assets.read} alt="" />
          <p className='cursor-pointer lg:text-xl hover:text-neutral-600 ease-in-out transition-all' onClick={()=>setSelectedMenu('readArticle')}>Read Articles</p>
        </div>
        <div className='mt-4 w-fit cursor-pointer text-red-500 flex items-center group hover:translate-x-4 ease-in-out transition-all'>
          <img className='w-8 h-8  ease-in-out transition-all' src={assets.logout} alt="" />
          <p className='cursor-pointer lg:text-xl hover:text-red-700  ease-in-out transition-all' onClick={()=>logout()}>Log Out</p>
        </div>
      </div>
    </div>
  )
}

export default Sidemenu
