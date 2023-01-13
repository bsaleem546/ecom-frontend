import React, {useContext, useState} from "react";
import {BsFillArrowLeftCircleFill, BsFillCaretDownFill, BsSearch} from "react-icons/bs";
import {AiFillAccountBook, AiOutlineProfile, AiOutlineLogout, AiOutlineCloseCircle, AiOutlineMinus} from "react-icons/ai";
import {RiDashboardLine} from "react-icons/ri";
import {MdProductionQuantityLimits} from "react-icons/md";
import {FaUsers, FaAlignJustify} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {AuthContext} from "../../context/AuthContext";
import Logo from "../../assets/img/logo192.png";

const Sidebar = () => {
    const navigate = useNavigate()
    const {logout} = useContext(AuthContext)
    const [open, setOpen] = useState(true)
    const [subMenuOpen, setSubMenuOpen] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const Menus = [
        {title: 'Dashboard', icon: <RiDashboardLine/>, navi: '/admin/dashboard'},
        {title: 'Profile', icon: <AiOutlineProfile/>, navi: '/profile'},
        {title: 'Users', icon: <FaUsers/>, spacing: true, navi: '/admin/users'},
        {
            title: 'Product',
            submenu: true,
            navi: '#',
            icon:<MdProductionQuantityLimits/>,
            submenuItems: [
                {title: 'Categories', navi: '/admin/products/categories', icon: <AiOutlineMinus/>},
                {title: 'Brands', navi: '/admin/products/brands', icon: <AiOutlineMinus/>},
                {title: 'Products', navi: '/admin/products', icon: <AiOutlineMinus/>},
            ]
        },
        {title: 'Logout', icon: <AiOutlineLogout/>},
    ]

    const handleLogout = async () => {
        const result = await logout()
        toast.success(result.message)
        navigate('/login')
    }

    return (
        <>
            {/*normal layout*/}
            <div className={`hidden md:block bg-gray-800 h-auto p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}>
                <BsFillArrowLeftCircleFill className={`bg-white text-gray-800
                   text-3xl rounded-full absolute -right-3 top-9
                   border-1 border-gray-800 cursor-pointer ${!open && "rotate-180"}`}
                                           onClick={() => setOpen(!open)}/>
                <Link to={'/'} className='inline-flex'>
                    <AiFillAccountBook className={`bg-amber-300 text-4xl rounded cursor-pointer
                        block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`}/>
                    <h1 className={`text-white origin-left font-medium text-2xl
                         duration-200 ${!open && "scale-0"}`}>Ecommerce</h1>
                </Link>

                <div className={`flex items-center rounded-md bg-gray-200
                     mt-6 ${open ? "px-4" : "px-2.5"} py-2`}>
                    <BsSearch className={`text-black text-lg 
                        block float-left cursor-pointer ${open && 'mr-2'}`}/>
                    <input type="search" placeholder='Search'
                           className={`text-base bg-transparent w-full text-black
                               focus:outline-none ${!open && 'hidden'}`}/>
                </div>

                <ul className={`pt-2`}>
                    {Menus.map((menu, index) => (
                        <>
                            <li key={index}>
                                {menu.title === 'Logout' ?
                                    <button type="submit" onClick={handleLogout} className={`text-gray-300 text-sm flex 
                                        items-center gap-x-4 cursor-pointer p-2 rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`}>
                                        <span className={`text-2xl block float-left`}>
                                            {menu.icon ? menu.icon : <RiDashboardLine/>}
                                        </span>
                                        <span
                                            className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>{menu.title}</span>
                                    </button> :
                                    <Link to={menu.navi} className={`text-gray-300 text-sm flex 
                                items-center gap-x-4 cursor-pointer p-2 
                                hover:bg-gray-200 hover:text-black rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`}>
                                        <span className={`text-2xl block float-left`}>
                                            {menu.icon ? menu.icon : <RiDashboardLine/>}
                                        </span>
                                        <span
                                            className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>{menu.title}</span>
                                        {menu.submenu && open && (
                                            <BsFillCaretDownFill
                                                className={`duration-200 ${subMenuOpen && "rotate-180"}`}
                                                onClick={() => setSubMenuOpen(!subMenuOpen)}/>
                                        )}
                                    </Link>
                                }

                            </li>
                            {menu.submenu && subMenuOpen && open && (
                                <ul>
                                    {menu.submenuItems.map((submenu, subIndex) => (
                                        <li key={subIndex}>
                                            <Link to={submenu.navi} className={`text-gray-300 text-sm flex 
                                                items-center cursor-pointer p-2 px-6 hover:bg-gray-200 hover:text-black rounded-md`}>
                                                <span className={`text-md block float-left`}>
                                                    {submenu.icon ? submenu.icon : <RiDashboardLine/>}
                                                </span>
                                                <span
                                                    className='text-base font-medium flex-1 duration-200 px-2'>{submenu.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    ))}
                </ul>
            </div>

            {/*mobile layout*/}
            <div className={`flex justify-between md:hidden px-8 py-3 mx-auto border-b-2 border-gray-700 w-full`}>

                <div className="flex items-center">
                    <div>
                        <Link to="/">
                            <img src={Logo} alt="" className="h-12 w-12"/>
                        </Link>
                    </div>
                    <span className="text-2xl ml-2 font-bold uppercase text-white">Ecommerce</span>
                </div>

                <div>
                    <div className="relative md:hidden text-left">
                        {!dropDown ?
                            <FaAlignJustify className='cursor-pointer text-white text-2xl mt-2'
                                            onClick={() => setDropDown(!dropDown)}/> :
                            <AiOutlineCloseCircle className='cursor-pointer text-white text-2xl mt-2'
                                                  onClick={() => setDropDown(!dropDown)}/>}

                        {dropDown &&
                            <div
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">
                                    {Menus.map((menu, index) => (
                                        <div key={index}>
                                            {menu.title === 'Logout' ?
                                                <button type="submit" onClick={handleLogout}
                                                        className="flex items-center text-gray-700 w-full px-4 py-2 text-left text-sm"
                                                        role="menuitem" tabIndex="-1" id="menu-item-3">
                                                    <span className='mr-2'>{menu.icon ? menu.icon :
                                                        <RiDashboardLine/>}</span>
                                                    Logout
                                                </button> :
                                                <>
                                                    <Link to={menu.navi}
                                                          className={`flex items-center text-gray-700 block px-4 py-2 text-sm`}>
                                                        <span className='mr-2'>{menu.icon ? menu.icon :
                                                    <RiDashboardLine/>}</span>
                                                        <span>{menu.title}</span>
                                                        {menu.submenu && <BsFillCaretDownFill
                                                            className={`ml-24 duration-200 ${subMenuOpen && "rotate-180"}`}
                                                            onClick={() => setSubMenuOpen(!subMenuOpen)}/>}
                                                    </Link>
                                                    {menu.submenu && subMenuOpen &&
                                                        <div>
                                                            {menu.submenuItems.map((submenu, subIndex) => (
                                                                <div key={subIndex}>
                                                                    <Link to={submenu.navi}
                                                                          className={`flex items-center text-gray-700 block px-4 py-2 text-sm ml-8`}>
                                                                        <span className='mr-2'>{submenu.icon}</span>
                                                                        <span>{submenu.title}</span>
                                                                    </Link>
                                                                </div>
                                                            ))}

                                                        </div>
                                                    }
                                                </>
                                            }
                                        </div>
                                    ))}


                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar