import React, {useContext, useState} from "react";
import Navbar from "../components/Navbar";
import {Link, useNavigate} from "react-router-dom";
import Footer from "../components/Footer";
import {AuthContext} from "../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {

    const { processing, setProcessing, register } = useContext(AuthContext)
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        const result = await register(name, email, password)
        if (result.status === false){
            toast.error(result.message)
        }
        else{
            toast.success(result.message)
            navigate('/login')
        }
        setProcessing(false)
    }
    return (
        <div className='min-h-screen'>
            <Navbar/>

            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="bg-[#2D333B] w-full sm:w-3/4 max-w-lg p-12 pb-6 shadow-2xl rounded">
                    <div className="text-white pb-4 text-3xl font-semibold">Register</div>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="block text-gray-700 p-1 m-4 ml-0 w-full rounded text-lg font-normal placeholder-gray-300"
                            type="text" required
                            placeholder="Your Name"
                            onChange={e => setName(e.target.value)}
                        />
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
                            className="inline-block mt-2 bg-gray-600 hover:bg-gray-700 focus:bg-green-800 px-6 py-2 rounded text-white shadow-lg"
                        >
                            Register
                        </button>
                    </form>
                    <div className="pt-10 flex items-center justify-between">

                        <Link to={'/login'}
                              className="inline-block text-green-700 hover:text-green-900 font-normal text-sm">
                            Already register go back to login
                        </Link>
                    </div>
                </div>
                <p className="mt-4 text-center text-gray-400 text-xs">
                    &copy;2022 ABC Corporation. All rights reserved.
                </p>
            </div>

            <Footer/>
        </div>
    )
}

export default Register