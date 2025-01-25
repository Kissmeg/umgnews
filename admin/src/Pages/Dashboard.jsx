import React from 'react'
import Sidemenu from '../Components/Sidemenu'
import CreateArticle from '../Components/CreateArticle'
import { useState } from 'react'
import { Context } from '../Context/JSXContext'
import { useContext } from 'react'
import ReadArticle from '../Components/ReadArticle'
import MainDash from '../Components/MainDash'

const Dashboard = () => {
  const {setSelectedMenu, selectedMenu} = useContext(Context);
  return (
    <div>
      <div className="grid grid-cols-5 grid-rows-5 gap-4 p-8 h-screen">
        <div className="row-span-5 border rounded-2xl shadow-2xl bg-blue-50">
          <Sidemenu/>
        </div>
        <div className="col-span-4 row-span-5 rounded-2xl shadow-2xl border p-4 bg-blue-50">
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
