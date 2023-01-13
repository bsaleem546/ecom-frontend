import React, {useContext, useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {

    const {login, processing, setProcessing, setUser, setToken } = useContext(AuthContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        const result = await login(email, password)
        if (result.status === false){
            toast.error(result.message)
        }
        else{
            setUser(result.user)
            setToken(result.token)
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            toast.success(result.message)
            result.user.role === 'admin' ? navigate('/admin/dashboard') : navigate('/')
        }
        setProcessing(false)
    }

    return (
        <div className='min-h-screen'>
            <Navbar/>

            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="bg-[#2D333B] w-full sm:w-3/4 max-w-lg p-12 pb-6 shadow-2xl rounded">
                    <div className="text-white pb-4 text-3xl font-semibold">Login</div>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="block text-gray-700 p-1 m-4 ml-0 w-full rounded text-lg font-normal placeholder-gray-300"
                            type="email" required
                            placeholder="Your email"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            className="block text-gray-700 p-1 m-4 ml-0 w-full rounded text-lg font-normal placeholder-gray-300"
                            type="password" required
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button type='submit' disabled={processing}
                            className="inline-block mt-2 bg-gray-600 hover:bg-gray-700 focus:bg-gray-800
                            px-6 py-2 rounded text-white shadow-lg disabled:bg-gray-200 disabled:text-gray-700 disabled:cursor-not-allowed"
                        >
                            Login
                        </button>
                    </form>
                    <div className="pt-10 flex items-center justify-between">
                        <a
                            href="#"
                            className="inline-block text-green-700 hover:text-green-900 align-baseline font-normal text-sm"
                        >
                            Forgot password?
                        </a>
                        <Link to={'/register'} className="inline-block text-green-700 hover:text-green-900 font-normal text-sm">
                            Create an Account
                        </Link>
                    </div>
                </div>

            </div>

            <Footer/>
        </div>
    )
}

export default Login