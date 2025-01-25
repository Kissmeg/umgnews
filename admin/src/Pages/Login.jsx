import { useState } from "react";
import useLogin from "../hooks/useLogin"; // Putanja do hook-a

const Login = () => {
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
        <div className="flex justify-center items-center h-screen">
            <div className="shadow-2xl p-12 rounded-2xl border-neutral-200 border">
                <form onSubmit={handleSubmit}>
                    <div className="flex-col flex">
                        <p className="my-2 text-xl">Email</p>
                        <input className="border-black p-2 border-b-2" type="text" name="email" placeholder="Email" onChange={handleChange} />
                    </div>
                    <div className="flex-col flex mt-4">
                        <p className="my-2 text-xl">Password</p>
                        <input className="border-black p-2 border-b-2" type="password" name="password" placeholder="Password" onChange={handleChange} />
                    </div>
                    <div className="flex justify-center mt-8">
                        <button className="cursor-pointer border-2 px-4 py-2 text-xl rounded-lg hover:bg-black hover:text-white ease-in-out transition-all" type="submit" disabled={loading}>{loading ? "Logging in..." : "Submit"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
