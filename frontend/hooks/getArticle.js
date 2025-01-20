const getArticle = () =>{
    const getAllArticles = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/getArticle',{
                method: 'GET',
                headers:{'Content-Type':'application/json'}
            })
            const data = await res.json();
            if(res.status === 200){
                return data
            }else {
                console.error("Hook Error.")
                return[];
            }
            
        } catch (error) {
            console.error('Server side error.')
            return[]
        }
    }
    return {getAllArticles}
}
export default getArticle