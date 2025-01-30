import React, { useContext, useEffect, useState } from 'react';
import getAarticles from '../hooks/getAllArticles';
import { Link } from 'react-router-dom';
import { Context } from '../Context/JSXContext';
import { toast, ToastContainer } from 'react-toastify';
import getArticle from '../hooks/getArticle';
import { useAuth } from '../Context/useAuth';

const MainDash = () => {
    const { getAllArticles } = getArticle();
    const { getArticles } = getAarticles();
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const {setSelectedMenu, selectedMenu} = useContext(Context);
    const [loading, setLoading] = useState(true);
    const {adminData, token} = useAuth();
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const fetchedArticle = await getArticles();
          if (Array.isArray(fetchedArticle)) {
            setData(fetchedArticle.reverse());
          }
        } catch (error) {
          console.error("Greška prilikom preuzimanja podataka:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []); // **Izbačen `deleteArticle` da spreči beskonačno učitavanje**
    useEffect(() => {
        const fetchData = async () => {
          
          try {
            const fetchedArticle = await getAllArticles();
            if (Array.isArray(fetchedArticle)) {
                setData2(fetchedArticle);
            }
          } catch (error) {
            console.error("Greška prilikom preuzimanja podataka:", error);
          } finally {
            
          }
        };
        fetchData();
      }, []); // **Izbačen `deleteArticle` da spreči beskonačno učitavanje**

      const cleanDescription = (description) => {
        return description.replace(/<\/?p>/g, '');
      };
  // Brojimo artikle po kategorijama
  const politicsCount = data.filter(item => item.category === 'politics').length;
  const economyCount = data.filter(item => item.category === 'economy').length;
  const worldCount = data.filter(item => item.category === 'world').length;
  const techCount = data.filter(item => item.category === 'technology').length;
  const scienceCount = data.filter(item => item.category === 'science').length;
  const sportsCount = data.filter(item => item.category === 'sports').length;
  const entertainementCount = data.filter(item => item.category === 'entertainment').length;
  const seriesCount = data.filter(item => item.category === 'series').length;
  const healthCount = data.filter(item => item.category === 'health').length;
  const businessCount = data.filter(item => item.category === 'business').length;
  return (
    <div className='code animation-scale ease-in-out transition-all'>
        {loading ? (
            <div className="grid grid-cols-6 grid-rows-4 gap-4">
                <div className="col-span-2 border p-20 rounded-xl shadow-xl animate-pulse bg-neutral-300">
                   
                </div>
                <div className="col-span-2 col-start-3 border rounded-xl shadow-xl animate-pulse bg-neutral-300">

                </div>
                <div className="col-span-2 col-start-5 border rounded-xl shadow-xl animate-pulse bg-neutral-300">

                </div>
                <div className="col-span-6 row-span-5 row-start-2 border rounded-xl shadow-xl animate-pulse bg-neutral-300">

                </div>
            </div>
        ) : (

        <div>
            <div className="grid xl:grid-cols-6 gap-4 ">
                <div className="col-span-1 lg:col-span-2 lg:col-start-1 border p-4 rounded-xl shadow-xl ">
                <p className='lg:text-lg xl:text-2xl mb-1 text-center'>Total Articles</p>  
                    <div className='flex items-center w-full justify-center size-24 rounded-full'>
                        <div className='flex justify-center border-2  size-24 items-center rounded-full hover:scale-110 ease-in-out transition-all cursor-pointer' onClick={()=>setSelectedMenu('readArticle')}>
                            <p className='text-4xl'>{data.length}</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 lg:col-span-2 lg:col-start-3 border p-4 rounded-xl shadow-xl ">
                <p className='lg:text-lg xl:text-2xl mb-1 text-center'>Total Articles By Category</p>
                    <div className='text-xs code grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-2 gap-4'>
                        <div className='flex justify-center items-center'>
                            <Link to='https://www.umgnews.com/politics' target='_blank'>
                                <div className='lg:w-[80px] lg:h-[50px] shadow-2xl w-fit flex flex-col justify-center items-center p-2 rounded-xl hover:scale-110 ease-in-out transition-all cursor-pointer'> 
                                    <p>Politics</p>
                                    <p>{politicsCount}</p>
                                </div>
                            </Link>
                        </div>
                        <div className='flex justify-center items-center'>
                            <Link to={'https://www.umgnews.com/economy' }target='_blank'>
                                <div className='lg:w-[80px] lg:h-[50px] shadow-2xl w-fit flex flex-col justify-center items-center p-2 rounded-xl hover:scale-110 ease-in-out transition-all cursor-pointer'> 
                                    <p>Economoy</p>
                                    <p>{economyCount}</p>
                                </div>
                            </Link>
                        </div>
                        <div className='flex justify-center items-center'>
                            <Link to={'https://www.umgnews.com/world'} target='_blank'> 
                                <div className='lg:w-[80px] lg:h-[50px] shadow-2xl w-fit flex flex-col justify-center items-center p-2 rounded-xl hover:scale-110 ease-in-out transition-all cursor-pointer'> 
                                    <p>World</p>
                                    <p>{worldCount}</p>
                                </div>
                            </Link>
                        </div>
                        <div className='flex justify-center items-center'>
                            <Link to={'https://www.umgnews.com/technology'} target='_blank'>
                                <div className='lg:w-[80px] lg:h-[50px] shadow-2xl w-fit flex flex-col justify-center items-center p-2 rounded-xl hover:scale-110 ease-in-out transition-all cursor-pointer'> 
                                    <p>Technology</p>
                                    <p>{techCount}</p>
                                </div>
                            </Link>
                        </div>
                        <div className='flex justify-center items-center'>
                            <Link to={'https://www.umgnews.com/science'} target='_blank'>
                                <div className='lg:w-[80px] lg:h-[50px] shadow-2xl w-fit flex flex-col justify-center items-center p-2 rounded-xl hover:scale-110 ease-in-out transition-all cursor-pointer'> 
                                    <p>Science</p>
                                    <p>{scienceCount}</p>
                                </div>
                            </Link>
                        </div>
                        <div className='flex justify-center items-center'>
                            <Link to={'https://www.umgnews.com/sports'} target='_blank'>
                                <div className='lg:w-[80px] lg:h-[50px] shadow-2xl w-fit flex flex-col justify-center items-center p-2 rounded-xl hover:scale-110 ease-in-out transition-all cursor-pointer'> 
                                    <p>Sports</p>
                                    <p>{sportsCount}</p>
                                </div>
                            </Link>
                        </div>
                        <div className='flex justify-center items-center'>
                            <Link to={'https://www.umgnews.com/entertainment'} target='_blank'>
                                <div className='lg:w-[80px] lg:h-[50px] shadow-2xl w-fit flex flex-col justify-center items-center p-2 rounded-xl hover:scale-110 ease-in-out transition-all cursor-pointer'> 
                                    <p>Fun </p>
                                    <p>{entertainementCount}</p>
                                </div>
                            </Link>
                        </div>
                        <div className='flex justify-center items-center'>
                            <Link to={'https://www.umgnews.com/series'} target='_blank'>
                                <div className='lg:w-[80px] lg:h-[50px] shadow-2xl w-fit flex flex-col justify-center items-center p-2 rounded-xl hover:scale-110 ease-in-out transition-all cursor-pointer'> 
                                    <p>Series</p>
                                    <p>{seriesCount}</p>
                                </div>
                            </Link>
                        </div>
                        <div className='flex justify-center items-center'>
                            <Link to={'https://www.umgnews.com/health'} target='_blank'>
                                <div className='lg:w-[80px] lg:h-[50px] shadow-2xl w-fit flex flex-col justify-center items-center p-2 rounded-xl hover:scale-110 ease-in-out transition-all cursor-pointer'> 
                                    <p>Health</p>
                                    <p>{healthCount}</p>
                                </div>
                            </Link>
                        </div>
                        <div className='flex justify-center items-center'>                        
                            <Link to={'https://www.umgnews.com/business'} target='_blank'>
                                <div className='lg:w-[80px] lg:h-[50px] shadow-2xl w-fit flex flex-col justify-center items-center p-2 rounded-xl hover:scale-110 ease-in-out transition-all cursor-pointer'> 
                                    <p>Business</p>
                                    <p>{businessCount}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 lg:col-span-2 lg:col-start-5 border p-4 rounded-xl shadow-xl ">
                    <div className='flex justify-center'>
                        <div className=''>
                            <div className='shadow-2xl rounded-lg p-4'>
                                <p className='text-xs text-center'>Username</p>
                                <p>{adminData.username}</p>
                            </div>
                            <div className='shadow-2xl rounded-lg p-4 mt-2'>
                                <p className='text-xs text-center'>Email</p>
                                <p>{adminData.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-12'>
                <p className='text-2xl'>Latest 12 News</p>
            </div>
            <div className='grid overflow-y-auto lg:grid-cols-4 xl:grid-cols-4 mt-4 gap-4'>
                {data2.slice(0, 12).map((item, index) => (
                    <div className='overflow-hidden' key={index}>
                        <div className='flex'>
                            <div className='w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] overflow-hidden rounded-lg'>
                                <Link to={`https://www.umgnews.com/news/${item.headingslug}/${item.id}`} target='_blank'>
                                <img className='w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] hover:scale-110 object-cover ease-in-out transition-all' src={item.image[0]} alt="" /></Link>
                            </div>
                            <div>
                                <Link to={`https://www.umgnews.com/news/${item.headingslug}/${item.id}`} target='_blank' >
                                <p className='text-xs ml-4'>{item.heading.slice(0,20)}...</p></Link>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        )}
        
    </div>
  );
};

export default MainDash;
