import React from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { Context } from '../Context/JSXContext';
import { useAuth } from '../Context/useAuth';
import {Link} from 'react-router-dom'
const MobileMenu = () => {
    const {logout} = useAuth();
    const {setSelectedMenu, selectedMenu} = useContext(Context);
    const [mobileMenu, setMobileMenu] = useState();
    return (
    <div>
      <div className='fixed p-2 bg-black w-full'>
        <div className='flex justify-between'>
          <div>
            <Link to={'https://www.umgnews.com'} target='_blank'>
              <img className='w-[50px] h-[50px] object-cover hover:scale-110 ease-in-out transition-all' src={assets.logo} alt="" />
            </Link>
          </div>
          <div>
            <img className='' src={assets.menu} alt="" onClick={()=>setMobileMenu(!mobileMenu)}/>
          </div>
        </div>
      </div>
      <div className={`fixed z-40 bg-black transition-all h-full w-full opacity-10 border-r rounded-tr-2xl ease-in-out  ${mobileMenu ? `transition-all ease-in-out -translate-x-0` : `transition-all ease-in-out -translate-x-full`}`} onClick={()=>setMobileMenu(!mobileMenu)}>

      </div>
      <div className={`fixed z-50 bg-black h-full w-[60%] border-r rounded-tr-2xl transition-all ease-in-out  ${mobileMenu ? `transition-all ease-in-out -translate-x-0` : `transition-all ease-in-out -translate-x-full`}`}>
           <div className='mt-20 text-white'>
                <div className='group flex items-center text-xl mt-2'>
                    <img className='w-8 h-8 mx-2' src={assets.dashboard_white} alt="" />
                    <p onClick={()=>{setSelectedMenu('mainDash'), setMobileMenu(!mobileMenu)}}>Dashboard</p>
                </div>
                <div className='group flex items-center text-xl mt-2'>
                    <img className='w-8 h-8 mx-2' src={assets.table_white} alt="" />
                    <p onClick={()=>{setSelectedMenu('createArticle'), setMobileMenu(!mobileMenu)}}>Create Article</p>
                </div>
                <div className='group flex items-center text-xl mt-2'>
                    <img className='w-8 h-8 mx-2' src={assets.article_white} alt="" />
                    <p onClick={()=>{setSelectedMenu('readArticle'), setMobileMenu(!mobileMenu)}}>All Articles</p>
                </div>
                <div className='group flex items-center text-xl mt-2'>
                    <img className='w-8 h-8 mx-2' src={assets.logout} alt="" />
                    <p className='text-red-500' onClick={(()=>logout())}>Logout</p>
                </div>
           </div>
      </div>
    </div>
  )
}

export default MobileMenu
