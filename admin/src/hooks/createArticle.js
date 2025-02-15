const useCreateArticle = () => {
    const createArticle = async (values) => {
      try {
        
        const userData = localStorage.getItem('admin_data');

        const parsedData = JSON.parse(userData);
        
        console.log("Token:", parsedData.token);
        
        if(!parsedData.token){
          return res.status(404).json({message:"Token is not valid."})
        }
        if(!parsedData){
          return parsedData.token || null
          
        }
        const res = await fetch(`${import.meta.env.VITE_URL}/api/createArticle`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${parsedData.token}`,  // Razmak između Bearer i tokena
          },
          body: values  // Pretvaranje values u JSON ako šaljete JSON podatke
        });

        
        
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
