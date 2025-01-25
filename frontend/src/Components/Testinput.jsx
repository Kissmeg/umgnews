import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import useCreateArticle from '../../hooks/createArticle';
import { assets } from '../assets/assets';

const Testinput = () => {
  const [inputImage, setInputImage] = useState();
  const { createArticle } = useCreateArticle();
  const [headingSlug, setHeadingSlug] = useState();
  const [input, setInput] = useState({
    heading: "",
    headingslug: "",
    description: "",
    location: "",
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Vreme u formatu HH:MM
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
    const file = e.target.files[0];
    if (file) {
      setInputImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setInput((prev) => ({ ...prev, imagePreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSlug = () => {
    const createSlug = input.heading.toLowerCase().replace(/ /g, '-');
    setHeadingSlug(createSlug); // Postavljanje sluga
  };

  const handleItem = async (e) => {
    e.preventDefault(); // Sprečava reload

    if (!inputImage) {
      toast.error('Molimo vas da izaberete sliku');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('heading', input.heading);
      formData.append('headingslug', headingSlug || input.heading.toLowerCase().replace(/ /g, '-'));
      formData.append('description', input.description);
      formData.append('location', input.location);
      formData.append('category', input.category);
      formData.append('image', inputImage);
      formData.append('date', input.date.replace(/-/g, '/')); // Datum
      formData.append('time', input.time); // Vreme

      await createArticle(formData);
      toast.success('Oglas uspešno postavljen');
      setInputImage(null);
    } catch (error) {
      toast.error('Popunite sva potrebna polja.');
      console.error(error);
    }
  };

  return (
    <div className="flex-col">
      <ToastContainer />
      <div>
        <p>Heading</p>
        <input className="border" type="text" name="heading" value={input.heading} onChange={handleChange} required />
      </div>
      <div>
        <p>Slika</p>
        <input className="border" id="inputImage" type="file" accept="image/*" name="image" onChange={handleImageChange} required />
      </div>
      <div>
        <p>Description</p>
        <ReactQuill className="pb-20 rounded-sm h-[250px] w-[300px] lg:h-[250px] lg:w-[500px]" value={input.description} name="description" onChange={(value) => handleChange(value, "description")} required />
      </div>
      <div>
        <p>Lokacija</p>
        <input className="border" type="text" name="location" value={input.location} onChange={handleChange} required />
      </div>
      <div>
        <p>Kategorija</p>
        <div>
          <div className="flex gap-2">
            <input className="border" type="radio" name="category" value="politics" checked={input.category === 'politics'} onChange={handleChange} />
            <p>Politics</p>
          </div>
          <div className="flex gap-2">
            <input className="border" type="radio" name="category" value="world" checked={input.category === 'world'} onChange={handleChange} />
            <p>World</p>
          </div>
          <div className="flex gap-2">
            <input className="border" type="radio" name="category" value="business" checked={input.category === 'business'} onChange={handleChange} />
            <p>Business</p>
          </div>
          <div className="flex gap-2">
            <input className="border" type="radio" name="category" value="economy" checked={input.category === 'economy'} onChange={handleChange} />
            <p>Economy</p>
          </div>
          <div className="flex gap-2">
            <input className="border" type="radio" name="category" value="techonology" checked={input.category === 'techonology'} onChange={handleChange} />
            <p>Technology</p>
          </div>
        </div>
      </div>
      <button onClick={handleItem}>submit</button>
      <button className="ml-4" onClick={handleSlug}>slug</button>
      <div>
        Loading more...
      </div>
    </div>
  );
};

export default Testinput;
