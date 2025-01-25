import { useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Context = createContext();

export const JSXContext = ({ children }) =>{
    const [selectedMenu, setSelectedMenu] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleScrollLink = (target) => {
        if (location.pathname !== '/') {
          // Ako nismo na glavnoj stranici, navigiraj na početnu stranicu
          navigate('/');
          
          
          // Kada se navigacija izvrši, postavi mali timeout za skrolovanje
          setTimeout(() => {
            const element = document.getElementById(target);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100); // 100ms je dovoljno vreme da se komponenta učita
        } else {
          // Ako smo već na početnoj, skroluj direktno
          const element = document.getElementById(target);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };
    return(
        <Context.Provider value={{handleScrollLink, setSelectedMenu ,selectedMenu}}>
            {children}
        </Context.Provider>
    )
}
export default JSXContext