import React, { useEffect, useState } from 'react';
import getArticle from '../hooks/getArticle';
import { Link } from 'react-router-dom';
import delArticle from '../hooks/deleteArticle';
import { toast, ToastContainer } from 'react-toastify';
import getAarticles from '../hooks/getAllArticles';
import { assets } from '../assets/assets';

const ReadArticle = () => {
  const { deleteArticle } = delArticle();
  const { getArticles } = getAarticles();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const articlesPerPage = 18;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
          const fetchedArticle = await getArticles();
          if (Array.isArray(fetchedArticle)) {
            setData(fetchedArticle);
          }
      } catch (error) {
        console.error("Greška prilikom preuzimanja podataka:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // **Izbačen `deleteArticle` da spreči beskonačno učitavanje**

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      setData(prevData => prevData.filter(item => item.id !== id)); // Ručno ažuriranje liste
      toast.success('Article deleted successfully.');
    } catch (error) {
      toast.error('Error deleting article.');
    }
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = data.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className='animation-scale ease-in-out transition-all'>
      <ToastContainer />

      {loading ? (
        <div className="animate-pulse">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(18)].map((_, index) => (
            <div key={index} className="border flex p-2 rounded-2xl">
              <div className="p-12 border rounded-lg bg-neutral-200"></div>
              <div className="flex-col ml-4 w-full">
                <div className="w-full mb-1 flex justify-between gap-8">
                  <div className="border h-8 w-full rounded-lg bg-neutral-100"></div>
                  <div className="border h-8 w-8 rounded-lg bg-neutral-100"></div>
                </div>
                <div className="border h-8 w-full rounded-lg bg-neutral-100"></div>
                <div className="border mt-1 h-8 w-32 rounded-lg bg-neutral-100"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      ) : (
        <div>
          <div className='grid grid-cols-3 gap-4'>
            {currentArticles.map((item, index) => (
              <div className='shadow-2xl rounded-lg ease-in-out transition-all border border-black p-2 hover:scale-105' key={index}>
                <div className='flex group justify-between'>
                  <div className='w-[100px] h-[100px] overflow-hidden'>
                    <Link to={`https://www.umgnews.com/news/${item.headingslug}/${item.id}`} target='_blank'>
                      <img className='w-[100px] h-[100px] object-cover hover:scale-110 ease-in-out transition-all' src={item.image[0]} alt="" />
                    </Link>
                  </div>
                  <div className='ml-4'>
                    <div className='flex'>
                      <p className='text-xs text-neutral-500'>{item.date}</p>
                      <p className='text-xs ml-1 text-neutral-500'>| {item.time}</p>
                      <Link to={`https://www.umgnews.com/${item.category}`} target='_blank'>
                        <p className='text-xs ml-1 text-neutral-500'>| {item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                      </Link>
                    </div>
                    <Link to={`https://www.umgnews.com/news/${item.headingslug}/${item.id}`} target='_blank'>
                      <h1 className='text-lg font-bold hover:text-neutral-500 hover:translate-x-2 ease-in-out transition-all'>{item.heading.slice(0, 30)}</h1>
                    </Link>
                  </div>
                  <div className=''>
                    <button className='cursor-pointer' onClick={() => handleDelete(item.id)}>
                      <img className='size-6 hover:scale-105 ease-in-out transition-all' src={assets.trashcan} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginacija */}
          <div className='flex items-center justify-center gap-4 mt-4'>
            <button 
              className={`px-4 py-2 border rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white ease-in-out transition-all cursor-pointer'}`} 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prethodna
            </button>
            <span className="text-lg font-semibold">{currentPage}</span>
            <button 
              className={`px-4 py-2 border rounded ${indexOfLastArticle >= data.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white ease-in-out transition-all cursor-pointer'}`} 
              onClick={() => setCurrentPage(prev => (indexOfLastArticle < data.length ? prev + 1 : prev))}
              disabled={indexOfLastArticle >= data.length}
            >
              Sledeća
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ReadArticle;