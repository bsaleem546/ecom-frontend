import { createContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import {Navigate} from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const URL = process.env.REACT_APP_API_URL //'http://127.0.0.1:8000/api/'

    const [user, setUser] = useState({})
    const [token, setToken] = useState('')
    const [processing, setProcessing] = useState(false);

    const register = async (name, email, password) => {
        const response = await fetch(`${URL}auth/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, email: email, password: password})
        });

        const result = await response.json();
        return result
    }

    const logout = async () => {
        const token = 'Bearer '+localStorage.getItem('token')
        const response = await fetch(`${URL}auth/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });
        const result = await response.json();
        localStorage.clear();
        return result
    }

    const login = async (email, password) => {
        const response = await fetch(`${URL}auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        });

        const result = await response.json();
        return result
    }

    return (
        <AuthContext.Provider
            value={{
                processing,
                setProcessing,
                logout,
                login,
                register,
                user,
                setUser,
                token,
                setToken,
            }}
        >{children}</AuthContext.Provider>
    )
}