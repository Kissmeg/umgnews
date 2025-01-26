import { useState } from "react";
import { useAuth } from "../Context/useAuth.jsx";
import { toast } from "react-toastify";

const useLogin = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const loginUser = async (values) => {
        try {
            setError(null);
            setLoading(true);
            
            const res = await fetch(`${import.meta.env.VITE_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            
            if (res.status === 200) {
                toast.success('Prijava uspešna');
                login(data.token, data.admin); // Koristi "admin" umesto "user"
                console.log(data.admin);
            } else if (res.status === 404) {
                toast.error('Korisnik sa unetom email adresom ne postoji!');
            } else if (res.status === 401) {
                toast.error('Pogrešna šifra ili email adresa!');
            } else {
                toast.error("Greška prilikom prijavljivanja!");
            }
        } catch (error) {
            toast.error("Došlo je do greške sa serverom!");
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, loginUser };
};

export default useLogin;
