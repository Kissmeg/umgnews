const getAId = () =>{
    const getArticleId = async (_id) => {
        
        try {
            const res = await fetch(`http://localhost:4000/api/getArticleId?_id=${_id}`,{
                method:'GET',
                headers:{
                    'Content-Type': "application/json",
                },
                
            })
            console.log(_id);
            
            const data = await res.json();
            if (res.status === 200) {
                console.log(data);
                return data; // Vraća pronađene stavke
            } else {
                console.log('Baza je prazna');
                
            }
        } catch (error) {
            console.error('Greška pri dobijanju podataka:', error);
            return [];
        }
    }
    return {getArticleId}
}
export default getAId