import { useState } from "react";
import useLogin from "../../hooks/useLogin"; // Putanja do hook-a

const LoginPage = () => {
    const { loading, loginUser } = useLogin();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Lozinka" onChange={handleChange} />
            <button type="submit" disabled={loading}>{loading ? "Prijava..." : "Prijavi se"}</button>
        </form>
    );
};

export default LoginPage;
