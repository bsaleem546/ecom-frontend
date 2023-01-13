import logo from './logo.svg';
import './App.css';
import {Route, Routes, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NoAccess from "./pages/NoAccess";
import Users from "./pages/admin/Users";
import Category from "./pages/admin/Category";
import Brands from "./pages/admin/Brands";

function App() {

    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/contact' element={<Contact/>}/>

                <Route path='/login' element={<LOGGEDINNOACCESS><Login/></LOGGEDINNOACCESS>}/>
                <Route path='/register' element={<LOGGEDINNOACCESS><Register/></LOGGEDINNOACCESS>}/>

                <Route path='/profile' element={<USERROUTE><Profile/></USERROUTE>}/>

                <Route path='/admin/dashboard' element={<ADMINROUTE><Dashboard/></ADMINROUTE>}/>
                <Route path='/admin/users' element={<ADMINROUTE><Users/></ADMINROUTE>}/>
                <Route path='/admin/products/categories' element={<ADMINROUTE><Category/></ADMINROUTE>}/>
                <Route path='/admin/products/brands' element={<ADMINROUTE><Brands/></ADMINROUTE>}/>

                <Route path='/no-access' element={<NoAccess/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </>
    );
}

const USERROUTE = ({children}) => {
    const user = localStorage.getItem('user')
    return user ? <>{children}</> : <Navigate to="/no-access"/>
}

const useAuth = () => {
    let user
    const _user = localStorage.getItem("user")
    if (_user) {
        user = JSON.parse(_user)
    }
    if (user) {
        return {
            auth: true,
            role: user.role,
        }
    } else {
        return {
            auth: false,
            role: null,
        }
    }
}

const ADMINROUTE = ({children}) => {
    const {auth, role} = useAuth()
    return auth ? (
        role === 'admin' ? (
            <>{children}</>
        ) : (
            <Navigate to="/no-access"/>
        )
    ) : (
        <Navigate to="/login" />
    )
}

const LOGGEDINNOACCESS = ({children}) => {
    const user = localStorage.getItem('user')
    return user === null ? <>{children}</> : <Navigate to="/no-access"/>
}

export default App;
