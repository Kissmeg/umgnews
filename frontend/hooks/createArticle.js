const useCreateArticle = () => {
    const createArticle = async (values) => {
      try {
        console.log(values);
        
        const res = await fetch('http://localhost:4000/api/createArticle', {
          method: 'POST',
          body: values,  // Direktno šaljemo formData
        });

        console.log(res);
        
        const data = await res.json();
        if (res.ok) {
          return data;
        } else {
          throw new Error(data.message || 'Došlo je do greške');
        }
      } catch (error) {
        throw error;
      }
    };
  
    return { createArticle };
};
  
export default useCreateArticle;
