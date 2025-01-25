import React, { useEffect, useState } from 'react'
import getArticle from '../../hooks/getArticle'
import { Link } from 'react-router-dom'

const Home = () => {
  const { getAllArticles } = getArticle()
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedArticle = await getAllArticles();
      if (Array.isArray(fetchedArticle)) {
        setData(fetchedArticle)
      }
    }
    fetchData();
  }, [])

  const cleanDescription = (description) => {
    return description.replace(/<\/?p>/g, '');
  };

  return (
    <div id='home' >
      <div className='lg:flex main-font pt-20 lg:mt-0'>
        <div className='flex lg:w-1/2 justify-start border-b border-l p-4'>
          {data.slice(0 , 1).map((item, index) => (
            <div className='' key={index}>
              <div className='flex justify-start'>
                <Link to={`/news/${item.headingslug}/${item.id} `}>
                  <img className='h-[350px] w-[350px] object-cover ' src={item.image[0]} alt="" />
                </Link>
              </div>
              <div className=''>
                <div className='w-fit'>
                  <Link to={`/news/${item.headingslug}/${item.id} `}>
                    <p className='text-lg lg:text-3xl font-semibold'>{item.heading}</p>
                  </Link>
                </div>
                <p className='text-xs mt-2 text-neutral-500'>{item.date} | {item.time}</p>
                <div className="text-sm mt-4 description overflow-hidden" dangerouslySetInnerHTML={{ __html: cleanDescription(item.description.slice(0, 220).concat(' ...')) }} />
              </div>
            </div>
          ))}
        </div>

        <div className='lg:w-1/2 border-r border-b p-4'>
          {data.slice(1, 7).slice(0, -1).map((item, index) => (
            <div className='flex my-4' key={index}>
              <div className=''>
                <Link to={`/news/${item.headingslug}/${item.id} `}>
                  <img className='w-[75px] h-[75px] lg:w-[100px] lg:h-[100px] object-cover' src={item.image[0]} alt={item.description} />
                </Link>
              </div>
              <div className='ml-4'>
                <Link to={`/news/${item.headingslug}/${item.id} `}>
                  <p className='text-xs lg:text-sm w-[250px] xl:w-[300px] font-semibold'>{item.heading}</p>
                </Link>
                <p className='text-xs mt-1 text-neutral-500'>{item.date} | {item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-12 px-4'>
        <div>
          <p className='text-2xl font-semibold'>Latest News</p>
        </div>
        <div className='grid lg:grid-cols-5'>
          <div className='grid grid-cols-1 lg:grid-cols-2 col-span-5 lg:col-span-4'>
            {data.slice(6, 16).map((item, index)=>(
             <div>
               <div className='flex justify-center my-4 lg:w-[250px] lg:h-[150px] overflow-hidden' key={index}>
                <Link to={`/news/${item.headingslug}/${item.id}`}><img className='lg:w-[250px] lg:h-[150px] hover:scale-[1.15] object-cover ease-in-out transition-all' src={item.image[0]} alt="" /></Link>
              </div>
              <div className='ml-1 lg:w-1/2'>
                <Link to={`/news/${item.headingslug}/${item.id}`}><p className='font-bold hover:text-neutral-500 mt-2 hover:translate-x-2 ease-in-out transition-all '>{item.heading}</p></Link>
                <div className='mt-2'>
                  <p className='mb-8 text-neutral-500 text-xs'>{item.date} | {item.time}</p>
                </div>
              </div>
             </div>
            ))}
          </div>
          <div className='hidden lg:col-start-5 lg:grid-rows-5'> {/*stavi lg:block da ga poakzes ponovo*/}
            <div className='sticky border p-20 top-8'>
              place for your ad
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
