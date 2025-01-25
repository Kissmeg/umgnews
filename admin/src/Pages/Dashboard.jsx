import React from 'react'
import Sidemenu from '../Components/Sidemenu'
import CreateArticle from '../Components/CreateArticle'
import { useState } from 'react'
import { Context } from '../Context/JSXContext'
import { useContext } from 'react'
import DeleteArticle from '../Components/DeleteArticle'
import ReadArticle from '../Components/ReadArticle'

const Dashboard = () => {
  const {setSelectedMenu, selectedMenu} = useContext(Context);
  return (
    <div>
      <div className="grid grid-cols-5 grid-rows-5 gap-4 p-8 h-screen">
        <div className="row-span-5 border">
          <Sidemenu/>
        </div>

        <div className="col-span-4 row-span-5 border p-4">
          {selectedMenu === 'createArticle' &&(
            <CreateArticle/>
          )}
           {selectedMenu === 'deleteArticle' &&(
            <DeleteArticle/>
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
