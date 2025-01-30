import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import useCreateArticle from '../hooks/createArticle';
import { assets } from '../assets/assets';

const CreateArticle = () => {
  const { createArticle } = useCreateArticle();
  const [headingSlug, setHeadingSlug] = useState();
  const [inputImages, setInputImages] = useState([]); // Sada koristimo niz za slike
  const [imagePreviews, setImagePreviews] = useState([]); // Čuvanje preview slika
  const [input, setInput] = useState({
    heading: "",
    headingslug: "",
    description: "",
    description2: "",
    location: "",
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    category: []
  });

  const handleChange = (e, customName = null) => {
    if (customName) {
      setInput((prev) => ({
        ...prev,
        [customName]: e,
      }));
    } else {
      const { name, value, type, checked } = e.target;
      if (type === "checkbox" && name === "category") {
        setInput((prev) => {
          const newCategoryValues = checked
            ? [...prev.category, value]
            : prev.category.filter((item) => item !== value);
          return { ...prev, category: newCategoryValues };
        });
      } else {
        setInput((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setInputImages(files);

      const previews = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(previews).then((imageUrls) => setImagePreviews(imageUrls));
    }
  };

  const handleSlug = () => {
    const createSlug = input.heading.toLowerCase().replace(/ /g, '-');
    setHeadingSlug(createSlug);
  };
  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[ćč]/g, 'c')
      .replace(/đ/g, 'dj')
      .replace(/š/g, 's')
      .replace(/ž/g, 'z')
      .replace(/\s+/g, '-') // Zameni razmake sa '-'
      .replace(/[^a-z0-9-]/g, ''); // Ukloni sve ostale karaktere
  }
  
  
  const handleItem = async (e) => {
    e.preventDefault();
  
    if (inputImages.length === 0) {
      toast.error('Please upload at least one image.');
      return;
    }
    if (input.description.length === 0){
      toast.error('Please provide description.')
      return;
    }

    if(input.category.length === 0){
      toast.error('Please select category.')
      return;
    }

    try {
      const formData = new FormData();
      formData.append('heading', input.heading);
      formData.append('headingslug', headingSlug || slugify(input.heading));
      formData.append('description', input.description);
      formData.append('description2', input.description2);
      formData.append('location', input.location);
      formData.append('category', input.category);
      formData.append('date', input.date.replace(/-/g, '/'));
      formData.append('time', input.time);
      
      // Dodajemo sve slike kao niz u formData
      inputImages.forEach((image) => {
        formData.append('images', image); // Dodajemo slike jednu po jednu
      });
  
      await createArticle(formData); // Ovo poziva API koji će slati podatke na backend
      toast.success('Article Published Successfully.');
      setInput({
        heading: "",
        headingslug: "",
        description: "",
        description2: "",
        location: "",
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: []
      })
      setInputImages([]);
      setImagePreviews([]);
    } catch (error) {
      toast.error('Please fill in all fields.');
      console.error(error);
    }
  };

  return (
    <div className="animation-scale">
      <ToastContainer />
        <div className=''>
          <div className='lg:flex justify-between gap-2'>
            <div className='lg:w-1/2 border rounded-lg overflow-hidden overflow-y-auto lg:h-[800px] p-4'>
              <div>
                <input className="p-2 text-2xl cursor-default w-full" type="text" name="heading" value={input.heading} onChange={handleChange} readOnly /> 
              </div>  
              {imagePreviews.map((item, index) => (
                index === 0 && (
                  <div key={index}>
                    <img src={item} alt="Slika" />
                  </div>
                )
              ))}
              <div>
                <p className='text-2xl'></p>
                <div>
                  <div 
                      className=" w-full  overflow-hidden p-4" 
                      value={input.description} 
                      name="description" 
                      onChange={(e) => handleChange(e.target.value, "description")} 
                      dangerouslySetInnerHTML={{ __html: input.description }}
                    />  
                </div>

                {imagePreviews.map((item, index) => (
                index === 1 && (
                  <div key={index}>
                    <img src={item} alt="Slika" />
                  </div>
                )
                ))}

                <div>
                  <div 
                      className=" w-full  overflow-hidden p-4" 
                      value={input.description2} 
                      name="description2" 
                      onChange={(e) => handleChange(e.target.value, "description2")} 
                      dangerouslySetInnerHTML={{ __html: input.description2 }}
                    />  
                </div>
                {imagePreviews.map((item, index) => (
                index === 2 && (
                  <div key={index}>
                    <img src={item} alt="Slika" />
                  </div>
                )
                ))}
                {imagePreviews.map((item, index) => (
                index === 3 && (
                  <div key={index}>
                    <img src={item} alt="Slika" />
                  </div>
                )
                ))}
                {imagePreviews.map((item, index) => (
                index === 4 && (
                  <div key={index}>
                    <img src={item} alt="Slika" />
                  </div>
                )
                ))}
              </div>
            </div>
            <div className='lg:w-1/2 border rounded-lg overflow-hidden overflow-y-auto lg:h-[800px] p-2 lg:p-4'>
              <form onSubmit={handleItem}>
              <div className=''>
                <div className='flex justify-center lg:justify-start'>
                  <label className='cursor-pointer flex items-center text-xs w-fit' htmlFor="imageInput">
                    <div className='border p-8 bg-white shadow-xl rounded-sm border-dashed border-black hover:scale-105 ease-in-out transition-all'>
                      <img className="text-center w-20 p-4 hover:scale-110 transition-all ease-in-out" src={assets.addimage} alt="" />
                      <p className='text-center'>Add images</p>
                      <p className='text-center text-xs text-neutral-500'>(max 5 images)</p>
                      <input className='hidden' id='imageInput' type='file' accept='image/*' name='images' multiple onChange={handleImageChange} />
                    </div>
                  </label>
                </div>
                
                <div className='flex justify-center lg:justify-start'>
                  <div className="gap-2 mt-4 grid grid-cols-2 lg:grid-cols-5">
                    {imagePreviews.map((preview, index) => (
                      <img key={index} src={preview} alt="Pregled slike" className="w-20 h-20 object-cover rounded-md" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className='flex justify-center gap-4 bg-white p-4 rounded-lg lg:w-fit'>
                <div className=''>
                    <p className='text-xl'>Heading</p>
                    <input className="border rounded-md p-2 text-lg" type="text" name="heading" value={input.heading} onChange={handleChange} required />
                </div>
                <div className='hidden'>
                    <p className=''>Location</p>
                    <input className="hidden" type="text" name="location" value={input.location} onChange={handleChange} />
                </div>
              </div>
              
             <div className='flex justify-center lg:block'>
              <div className='rounded-lg mt-4 p-4 bg-white '>     
                    <p className='mb-1 text-xl'>Description 1</p>
                    <ReactQuill className="pb-20 rounded-sm z-0 h-[250px] md:w-[550px] lg:w-[280px] xl:w-[380px]" value={input.description} name="description" onChange={(value) => handleChange(value, "description")} required />
                </div>
             </div>
              <div className='flex justify-center lg:block'>
                <div className='rounded-lg p-4 mt-4 bg-white'>     
                    <p className='mb-1 text-xl'>Description 2 <span className='text-neutral-500 text-xs'>(optional)</span></p>
                    <ReactQuill className="pb-20 rounded-sm z-0 h-[250px] md:w-[550px] lg:w-[280px] xl:w-[380px]" value={input.description2} name="description2" onChange={(value) => handleChange(value, "description2")} />
                </div>
              </div>
               <div>
            <div className='bg-white mt-4 p-4'>
            <p className='mb-4 text-xl'>Category</p>
              <div className='flex items-center gap-2 '>
                  <div className="flex gap-2 border p-2 rounded">
                      <input className="border " type="radio" name="category" value="politics" checked={input.category === 'politics'} onChange={handleChange} />
                      <p>Politics</p>
                  </div>
                  <div className="flex  gap-2 border p-2 rounded">
                      <input className="border" type="radio" name="category" value="economy" checked={input.category === 'economy'} onChange={handleChange} />
                      <p>Economy</p>
                  </div>
                  <div className="flex  gap-2 border p-2 rounded">
                      <input className="border" type="radio" name="category" value="world" checked={input.category === 'world'} onChange={handleChange} />
                      <p>World</p>
                  </div>
              </div>
              <div className='flex items-center gap-2 mt-4'>
                <div className="flex gap-2 border p-2 rounded">
                    <input className="border" type="radio" name="category" value="techonology" checked={input.category === 'techonology'} onChange={handleChange} />
                    <p>Technology</p>
                </div>
                <div className="flex gap-2 border p-2 rounded">
                      <input className="border" type="radio" name="category" value="entertainment" checked={input.category === 'entertainment'} onChange={handleChange} />
                      <p>Entertainment</p>
                  </div>
              </div>
              <div className='flex items-center gap-2 mt-4'>  
                  <div className="flex gap-2 border p-2 rounded">
                      <input className="border" type="radio" name="category" value="science" checked={input.category === 'science'} onChange={handleChange} />
                      <p>Science</p>
                  </div>
                  <div className="flex gap-2 border p-2 rounded">
                      <input className="border" type="radio" name="category" value="sports" checked={input.category === 'sports'} onChange={handleChange} />
                      <p>Sports</p>
                  </div>
                  <div className="flex gap-2 border p-2 rounded">
                      <input className="border" type="radio" name="category" value="series" checked={input.category === 'series'} onChange={handleChange} />
                      <p>Series</p>
                  </div>
              </div>
              
              <div className='flex items-center gap-2 mt-4'>
                  <div className="flex gap-2 border p-2 rounded">
                      <input className="border" type="radio" name="category" value="health" checked={input.category === 'health'} onChange={handleChange} />
                      <p>Health</p>
                  </div>
                  <div className="flex gap-2 border p-2 rounded">
                      <input className="border" type="radio" name="category" value="business" checked={input.category === 'business'} onChange={handleChange} />
                      <p>Business</p>
                  </div>
                  <div className="flex gap-2 border p-2 rounded">
                      <input className="border" type="radio" name="category" value="who-is" checked={input.category === 'who-is'} onChange={handleChange} />
                      <p>Who is?</p>
                  </div>
              </div>
            </div>
        </div>
              <div className='w-full flex self-end justify-center lg:justify-between mt-4 mb-16 lg:mb-0'>
                  <div></div>
                  <div>
                    <button className='text-xl border rounded-md px-4 py-2 bg-black text-white hover:text-black hover:bg-white ease-in-out transition-all cursor-pointer' >Publish</button>
                  </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CreateArticle;
{/*


        <div>
            <p className='mb-4'>Category</p>
            <div className='flex items-center gap-2 '>
                <div className="flex gap-2 border p-2 rounded">
                    <input className="border " type="radio" name="category" value="politics" checked={input.category === 'politics'} onChange={handleChange} />
                    <p>Politics</p>
                </div>
                <div className="flex  gap-2 border p-2 rounded">
                    <input className="border" type="radio" name="category" value="economy" checked={input.category === 'economy'} onChange={handleChange} />
                    <p>Economy</p>
                </div>
                <div className="flex  gap-2 border p-2 rounded">
                    <input className="border" type="radio" name="category" value="world" checked={input.category === 'world'} onChange={handleChange} />
                    <p>World</p>
                </div>
                <div className="flex gap-2 border p-2 rounded">
                    <input className="border" type="radio" name="category" value="techonology" checked={input.category === 'techonology'} onChange={handleChange} />
                    <p>Technology</p>
                </div>
            </div>

            <div className='flex items-center gap-2 mt-4'>  
                <div className="flex gap-2 border p-2 rounded">
                    <input className="border" type="radio" name="category" value="science" checked={input.category === 'science'} onChange={handleChange} />
                    <p>Science</p>
                </div>
                <div className="flex gap-2 border p-2 rounded">
                    <input className="border" type="radio" name="category" value="sports" checked={input.category === 'sports'} onChange={handleChange} />
                    <p>Sports</p>
                </div>
                <div className="flex gap-2 border p-2 rounded">
                    <input className="border" type="radio" name="category" value="entertainment" checked={input.category === 'entertainment'} onChange={handleChange} />
                    <p>Entertainment</p>
                </div>
                <div className="flex gap-2 border p-2 rounded">
                    <input className="border" type="radio" name="category" value="series" checked={input.category === 'series'} onChange={handleChange} />
                    <p>Series</p>
                </div>
            </div>
            
            <div className='flex items-center gap-2 mt-4'>
                <div className="flex gap-2 border p-2 rounded">
                    <input className="border" type="radio" name="category" value="health" checked={input.category === 'health'} onChange={handleChange} />
                    <p>Health</p>
                </div>
                <div className="flex gap-2 border p-2 rounded">
                    <input className="border" type="radio" name="category" value="business" checked={input.category === 'business'} onChange={handleChange} />
                    <p>Business</p>
                </div>
            </div>
        </div>


        <div className='w-full flex self-end justify-between'>
            <div></div>
            <button className='text-xl border rounded-md px-4 py-2 bg-black text-white hover:text-black hover:bg-white ease-in-out transition-all cursor-pointer' onClick={handleItem}>Publish</button>
        </div>
  */}