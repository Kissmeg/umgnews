const useCreateArticle = () =>{
    const createArticle = async (values) => {
        try {
            const res = await fetch('http://localhost:4000/api/createArticle',{
                method:'POST',
                body:values,
            })
            console.log(values);
            const data = await res.json();

            if(res.ok){
                console.log('Item uspešno kreiran:', data);
                return data
            }else {
            
                throw new Error(data.message || 'Došlo je do greške');
            }
        } catch (error) {
            console.error('Greška:', error.message);
            throw error;
        }
    }
    return {createArticle}
}
export default useCreateArticle