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
    <div className='lg:flex '>
      <div className='flex w-1/2 justify-start border p-4'>
        {data.slice(-1).map((item, index) => (
          <div className='' key={index}>
            <div className='flex justify-start'>
              <Link to={`/news/${item.headingslug}`} state={{ _id: item._id }}>
                <img className='h-[350px] w-[350px] object-cover ' src={item.image} alt="" />
              </Link>
            </div>
            <div className=''>
              <div className='w-fit'>
                <Link to={`/news/${item.headingslug}`} state={{ _id: item._id }}>
                  <p className='text-3xl font-semibold'>{item.heading}</p>
                </Link>
              </div>
              <p className='text-neutral-500'>{item.date}</p>
              <div className="description overflow-hidden after:content-['...']" dangerouslySetInnerHTML={{ __html: cleanDescription(item.description.slice(0, 220)) }} />
            </div>
          </div>
        ))}
      </div>
      <div className='w-1/2 border p-4'>
        {data.slice(-6).slice(0, -1).reverse().map((item, index) => (
          <div className='flex m-4' key={index}>
            <div className='w-[150px]'>
              <Link to={`/news/${item.headingslug}`} state={{ _id: item._id }}>
                <img className='w-[100px] h-[100px] object-cover' src={item.image} alt={item.description} />
              </Link>
            </div>
            <div className='ml-2 '>
              <div className=''>
                <Link to={`/news/${item.headingslug}`} state={{ _id: item._id }}>
                  <p className='text-base font-semibold'>{item.heading}</p>
                </Link>
              </div>
              <p className='text-neutral-500'>{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
