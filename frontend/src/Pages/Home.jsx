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
    <div>
      <div className='lg:flex main-font'>
        <div className='flex lg:w-1/2 justify-start border p-4'>
          {data.slice(-1).map((item, index) => (
            <div className='' key={index}>
              <div className='flex justify-start'>
                <Link to={`/news/${item.headingslug}`} state={{id: item.id }}>
                  <img className='h-[350px] w-[350px] object-cover ' src={item.image} alt="" />
                </Link>
              </div>
              <div className=''>
                <div className='w-fit'>
                  <Link to={`/news/${item.headingslug}`} state={{ id: item.id }}>
                    <p className='text-lg lg:text-3xl font-semibold'>{item.heading}</p>
                  </Link>
                </div>
                <p className='text-xs mt-2 text-neutral-500'>{item.date} | {item.time}</p>
                <div className="text-sm mt-4 description overflow-hidden" dangerouslySetInnerHTML={{ __html: cleanDescription(item.description.slice(0, 220).concat(' ...')) }} />
              </div>
            </div>
          ))}
        </div>

        <div className='lg:w-1/2 border p-4'>
          {data.slice(-6).slice(0, -1).reverse().map((item, index) => (
            <div className='flex my-4' key={index}>
              <div className=''>
                <Link to={`/news/${item.headingslug}`} state={{ id: item.id }}>
                  <img className='w-[75px] h-[75px] lg:w-[100px] lg:h-[100px] object-cover' src={item.image} alt={item.description} />
                </Link>
              </div>
              <div className='ml-4'>
                <Link to={`/news/${item.headingslug}`} state={{ id: item.id }}>
                  <p className='text-xs lg:text-sm w-[250px] xl:w-[300px] font-semibold'>{item.heading}</p>
                </Link>
                <p className='text-xs mt-1 text-neutral-500'>{item.date} | {item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-12 px-4'>
        <div className='grid grid-cols-5'>
          <div className='grid grid-cols-2 col-span-4'>
            {data.slice(-16).slice(0, -6).reverse().map((item, index)=>(
              <div className=''>
                <img className='w-[250px] h-[250px] object-cover' src={item.image} alt="" />
                {item.heading}
              </div>
            ))}
          </div>
          <div className='col-start-5 grid-rows-5'>
          d
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
