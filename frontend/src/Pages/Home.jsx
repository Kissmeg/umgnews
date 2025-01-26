import React, { useEffect, useState } from 'react'
import getArticle from '../../hooks/getArticle'
import { Link } from 'react-router-dom'

const Home = () => {
  const { getAllArticles } = getArticle()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
          const fetchedArticle = await getAllArticles();
          if (Array.isArray(fetchedArticle)) {
            setData(fetchedArticle)
          }
        
      }catch (error) {
        
      }
      finally{
        setLoading(false)
      }
    }
    fetchData();
  }, [])

  const cleanDescription = (description) => {
    return description.replace(/<\/?p>/g, '');
  };

  return (
    <div>
      {loading ? (
        <div>
          <div className='lg:flex justify-between mt-28 lg:mt-0'>
            <div className='lg:w-1/2 border-l border-b p-4 lg:flex flex-col'>
              <div className='border h-[75%] w-[75%] p-32 lg:p-0 rounded-lg bg-neutral-100 animate-pulse'>

              </div>
              <div className='border mt-4 p-4 rounded-lg lg:w-[75%] bg-neutral-100 animate-pulse'>

              </div>
              <div className='border mt-4 p-2 rounded-lg lg:w-[100%] bg-neutral-100 animate-pulse'>

              </div>
              <div className='border mt-2 p-2 rounded-lg lg:w-[85%] bg-neutral-100 animate-pulse'>

              </div>
              <div className='border mt-2 p-2 rounded-lg lg:w-[45%] bg-neutral-100 animate-pulse'>

              </div>
            </div>
            <div className='lg:w-1/2 border-b border-r p-4'>
              <div className='flex-col '>
                <div className='border p-4 mt-4 flex rounded-xl'>
                  <div className='p-8 border rounded-lg bg-neutral-100 animate-pulse'>
                  </div>
                  <div className='w-full flex-col '>
                    <div className='border p-2 mt-2 ml-2 bg-neutral-100 animate-pulse'>

                    </div>
                    <div className='border lg:w-1/2 p-2 mt-4 ml-2 bg-neutral-100 animate-pulse'>

                    </div>
                  </div>
                </div>
                <div className='border p-4 mt-4 flex rounded-xl'>
                  <div className='p-8 border rounded-lg bg-neutral-100 animate-pulse'>
                  </div>
                  <div className='w-full flex-col '>
                    <div className='border p-2 mt-2 ml-2 bg-neutral-100 animate-pulse'>

                    </div>
                    <div className='border lg:w-1/2 p-2 mt-4 ml-2 bg-neutral-100 animate-pulse'>

                    </div>
                  </div>
                </div>
                <div className='border p-4 mt-4 flex rounded-xl'>
                  <div className='p-8 border rounded-lg bg-neutral-100 animate-pulse'>
                  </div>
                  <div className='w-full flex-col '>
                    <div className='border p-2 mt-2 ml-2 bg-neutral-100 animate-pulse'>

                    </div>
                    <div className='border w-1/2 p-2 mt-4 ml-2 bg-neutral-100 animate-pulse'>

                    </div>
                  </div>
                </div>
                <div className='border p-4 mt-4 flex rounded-xl'>
                  <div className='p-8 border rounded-lg bg-neutral-100 animate-pulse'>
                  </div>
                  <div className='w-full flex-col '>
                    <div className='border p-2 mt-2 ml-2 bg-neutral-100 animate-pulse'>

                    </div>
                    <div className='border w-1/2 p-2 mt-4 ml-2 bg-neutral-100 animate-pulse'>

                    </div>
                  </div>
                </div>
                <div className='border p-4 mt-4 flex rounded-xl'>
                  <div className='p-8 border rounded-lg bg-neutral-100 animate-pulse'>
                  </div>
                  <div className='w-full flex-col '>
                    <div className='border p-2 mt-2 ml-2 bg-neutral-100 animate-pulse'>

                    </div>
                    <div className='border w-1/2 p-2 mt-4 ml-2 bg-neutral-100 animate-pulse'>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id='home' >
      <div className='lg:flex main-font pt-28'>
        <div className='flex lg:w-1/2 justify-start border-l p-4'>
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

        <div className='lg:w-1/2 border-r p-4'>
          {data.slice(1, 7).slice(0, -1).map((item, index) => (
            <div className='flex my-4' key={index}>
              <div className=''>
                <Link to={`/news/${item.headingslug}/${item.id} `}>
                  <img className='w-[75px] h-[75px] md:w-[100px] md:h-[100px] object-cover' src={item.image[0]} alt={item.description} />
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
      <div className=' px-4 border-x border-t pt-8'>
        <div>
          <p className='text-2xl font-semibold'>Latest News</p>
        </div>
        <div className='grid lg:grid-cols-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 col-span-5 lg:col-span-4'>
            {data.slice(6, 16).map((item, index)=>(
             <div key={index}>
               <div className='flex justify-center my-4 md:w-[250px] md:h-[150px] overflow-hidden' key={index}>
                <Link to={`/news/${item.headingslug}/${item.id}`}><img className='md:w-[250px] md:h-[150px] hover:scale-[1.15] object-cover ease-in-out transition-all' src={item.image[0]} alt="" /></Link>
              </div>
              <div className='ml-1 md:w-1/2'>
                <Link to={`/news/${item.headingslug}/${item.id}`}><p className='font-bold hover:text-neutral-500 mt-2 hover:translate-x-2 ease-in-out transition-all '>{item.heading}</p></Link>
                <div className='mt-2'>
                  <p className='mb-8 text-neutral-500 text-xs'>{item.date} | {item.time}</p>
                </div>
              </div>
             </div>
            ))}
          </div>
          <div className='hidden lg:block lg:col-start-5 lg:grid-rows-5'> {/*stavi lg:block da ga poakzes ponovo*/}
            <div className='sticky border-2 border-black rounded-lg p-4 top-32  text-center'>
              <p>Reach out to us at</p>
              <a href='mailto:support@umgnews.com' className='text-blue-500'>contact@umgnews.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
      )}
    </div>
  )
}

export default Home;
