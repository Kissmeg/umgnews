import React from 'react'
import Sidemenu from '../Components/Sidemenu'
import CreateArticle from '../Components/CreateArticle'
import { useState } from 'react'
import { Context } from '../Context/JSXContext'
import { useContext } from 'react'
import ReadArticle from '../Components/ReadArticle'
import MainDash from '../Components/MainDash'
import MobileMenu from '../Components/MobileMenu'

const Dashboard = () => {
  const {setSelectedMenu, selectedMenu} = useContext(Context);
  return (
    <div>
      <div className='lg:hidden'>
        <MobileMenu/>
      </div>
      <div className="grid lg:grid-cols-5 lg:grid-rows-5 gap-4 lg:p-8 lg:h-screen">
        <div className="row-span-5 border rounded-2xl shadow-2xl hidden lg:block">
          <Sidemenu/>
        </div>
        <div className="lg:col-span-4 lg:row-span-5 overflow-hidden overflow-y-scroll xl:overflow-y-hidden rounded-2xl shadow-2xl lg:border pt-20 p-4 lg:p-4 ">
          {selectedMenu === 'mainDash' &&(
            <MainDash/>
          )}
          {selectedMenu === 'createArticle' &&(
            <CreateArticle/>
          )}
          {selectedMenu === 'readArticle' &&(
            <ReadArticle/>
          )}
        </div>
    </div>
    
    </div>
  )
}

export default Dashboard
