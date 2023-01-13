import React, {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext"
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

import Logo from '../assets/img/logo192.png'

const Navbar = () => {
    const {logout} = useContext(AuthContext)

    const user = localStorage.getItem('user')
    const navigate = useNavigate()

    const [isClickedDD, setIsClickedDD] = useState(false)
    const [isClickedNav, setIsClickedNav] = useState(false)

    const fnDD = () => {
        setIsClickedDD(isClickedDD === true ? false : true)
    }
    const fnNAV = () => {
        setIsClickedNav(isClickedNav === true ? false : true)
    }
    const handleLogout = async () => {
        const result = await logout()
        toast.success(result.message)
        navigate('/login')
    }
    return (
        <nav className='border-b-2 border-gray-700'>
            <div className="px-8 py-3 mx-auto">
                <div className="flex justify-between">

                    <div className="flex items-center">
                        <div>
                            <Link to="/">
                                <img src={Logo} alt="" className="h-12 w-12"/>
                            </Link>
                        </div>
                        <span className="text-2xl ml-2 font-bold uppercase text-white">Ecommerce</span>
                    </div>

                    <div className="hidden lg:flex items-center p-2">
                        <form action="" className="w-full max-w-md">
                            <div className="relative flex items-center text-gray-400
                                    focus-within:text-gray-800">
                                <i className="fa fa-search h-5 w-5 absolute ml-3 pointer-events-none"
                                   aria-hidden="true"></i>
                                <input type="text" placeholder="Search"
                                       className="rounded-full pr-3 pl-10 py-2 border-2 border-slate-800 w-96 bg-gray-100
                                    focus:outline-none focus:shadow-lg focus:border-none
                                    dark:bg-gray-800 dark:text-white dark:border-1 dark:border-gray-500"/>
                            </div>
                        </form>
                    </div>

                    {/*nav in lg screen*/}
                    <div className="hidden lg:flex items-center">
                        <Link to={'/'}
                              className="text-base font-semibold px-5 hover:text-neutral-600 text-white">Home</Link>
                        <Link to={'/about'} className="text-base font-semibold px-5 hover:text-neutral-600 text-white">About
                            Us</Link>
                        <Link to={'/contact'}
                              className="text-base font-semibold px-5 hover:text-neutral-600 text-white">Contact
                            Us</Link>
                        {user ?
                            <div className="relative hidden md:inline-block text-left">
                                <div className='bg-gray-600 p-2 rounded-full shadow-lg cursor-pointer' onClick={fnDD}>
                                    <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
                                </div>
                                {
                                    isClickedDD && <div
                                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <div className="py-1" role="none">
                                            <Link to={'/profile'} className='text-gray-700 block px-4 py-2 text-sm'>Account
                                                settings</Link>
                                            <button type="submit" onClick={handleLogout}
                                                    className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                                                    role="menuitem" tabIndex="-1" id="menu-item-3">Sign out
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div> :
                            <Link to={'/login'} className='bg-gradient-to-r from-green-400 to-blue-500
                                px-5 py-3 rounded-full text-white font-bold shadow-lg mr-2 ml-2
                                hover:from-pink-500 hover:to-yellow-500'>
                                Login
                            </Link>
                        }

                    </div>

                    {/*nav btns in small screen*/}
                    <div className="lg:hidden flex items-center space-x-2">
                        {isClickedNav ?
                            <button onClick={fnNAV} className="bg-gray-600 px-3 py-2 rounded-full ml-2 shadow-lg hover:bg-gray-500">
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </button> :
                            <button onClick={fnNAV} className="bg-gray-600 px-3 py-2 rounded-full ml-2 shadow-lg hover:bg-gray-500">
                                <i className="fa fa-align-justify" aria-hidden="true"></i>
                            </button>
                        }
                        {user ?
                            <div className="relative hidden md:inline-block text-left">
                                <div className='bg-gray-600 p-1 rounded-full shadow-lg cursor-pointer' onClick={fnDD}>
                                    <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
                                </div>
                                {
                                    isClickedDD && <div
                                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <div className="py-1" role="none">
                                            <Link to={'/profile'} className='text-gray-700 block px-4 py-2 text-sm'>Account
                                                settings</Link>
                                            <button type="submit" onClick={handleLogout}
                                                    className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                                                    role="menuitem" tabIndex="-1" id="menu-item-3">Sign out
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div> :
                            <Link to={'/login'} className='bg-gradient-to-r from-green-400 to-blue-500
                                px-5 py-3 rounded-full text-white font-bold shadow-lg mr-2 ml-2
                                hover:from-pink-500 hover:to-yellow-500'>
                                Login
                            </Link>
                        }
                    </div>
                </div>
            </div>
            {/*nav in small screen*/}
            {isClickedNav &&
                <div>
                    <Link to={'/'}
                          className="block text-sm font-semibold px-8 py-2 hover:text-neutral-600 text-white">Home</Link>
                    <Link to={'/about'} className="block text-sm font-semibold px-8 py-2 hover:text-neutral-600 text-white">About
                        Us</Link>
                    <Link to={'/contact'}
                          className="block text-sm font-semibold px-8 py-2 hover:text-neutral-600 text-white">Contact
                        Us</Link>
                    <div className="flex items-center px-6 mt-5">
                    </div>
                </div>
            }
        </nav>
        // <div>
        //     <header className="text-gray-600 body-font">
        //         <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        //             <Link to={'/'} className="hidden md:flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        //                 {/*logo*/}
        //                 <span className="ml-3 text-xl text-white">Ecommerce</span>
        //             </Link>
        //             <nav className="md:ml-auto md:mr-auto hidden md:flex md:flex-wrap items-center text-base justify-center">
        //                 <Link to={'/'} className="mr-5 text-white hover:text-gray-500">Home</Link>
        //                 <Link to={'/about'} className="mr-5 text-white hover:text-gray-500">About Us</Link>
        //                 <Link to={'/contact'} className="mr-5 text-white hover:text-gray-500">Contact Us</Link>
        //             </nav>
        //             {user ?
        //                 <div className="relative hidden md:inline-block text-left">
        //                     <div className='bg-white p-2 rounded-full shadow-lg cursor-pointer' onClick={fnDD}>
        //                         <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
        //                     </div>
        //                     {
        //                         isClickedDD && <div
        //                             className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        //                             role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
        //                             <div className="py-1" role="none">
        //                                 <Link to={'/profile'} className='text-gray-700 block px-4 py-2 text-sm'>Account
        //                                     settings</Link>
        //                                 <button type="submit" onClick={handleLogout}
        //                                         className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
        //                                         role="menuitem" tabIndex="-1" id="menu-item-3">Sign out
        //                                 </button>
        //                             </div>
        //                         </div>
        //                     }
        //                 </div>
        //                 : <Link to={"/login"} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none
        //                 hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
        //                     Login
        //                 </Link>}
        //         </div>
        //     </header>
        // </div>
    )
}

export default Navbar