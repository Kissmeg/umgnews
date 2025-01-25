import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Context } from '../Context/JSXContext';
const Sidemenu = () => {
    const {setSelectedMenu, selectedMenu} = useContext(Context);
    console.log(selectedMenu);
    
  return (
    <div className=''>
      <div className='p-4'>
        <div>
            <p className='cursor-pointer' onClick={()=>setSelectedMenu('createArticle')}>Create Article</p>
        </div>
        <div>
            <p className='cursor-pointer' onClick={()=>setSelectedMenu('deleteArticle')}>Delete Article</p>
        </div>
        <div>
            <p className='cursor-pointer' onClick={()=>setSelectedMenu('readArticle')}>Read Articles</p>
        </div>
      </div>
    </div>
  )
}

export default Sidemenu
