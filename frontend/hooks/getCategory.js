const getCat = () =>{
    const getCategory = async (category) => {
        try {
            console.log(category);
            

            const res = await fetch(`http://localhost:4000/api/getCategory?category=${category}`,{
                method: 'GET',
                headers:{'Content-Type':'application/json'}
            })
            
            const data = await res.json();
            console.log(data);
            
            if(res.status === 200){
                return data
            }else {
                console.error("Hook Error.")
                return[];
            }
        } catch (error) {
            
        }
    }
    return {getCategory}
}
export default getCat
