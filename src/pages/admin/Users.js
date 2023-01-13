import React, {useEffect, useState} from "react";
import Sidebar from "../../components/dashboard/Sidebar";

import DataTable from 'react-data-table-component'
import Moment from 'react-moment';
import toast from "react-hot-toast";
import { FcEditImage } from "react-icons/fc";
import { AiFillDelete } from "react-icons/ai";
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const User = () => {

    const URL = process.env.REACT_APP_API_URL
    const token = 'Bearer ' + localStorage.getItem('token')
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [search, setSearch] = useState()
    const [mode, setMode] = useState(false)

    const [userID, setUserID] = useState(0)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [role, setRole] = useState('user')
    const [processing, setProcessing] = useState(false)

    const getUsers = async () => {
        try {
            const response = await fetch(`${URL}admin/users`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });
            const result = await response.json();
            setUsers(result)
            setFilteredUsers(result)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        const result = users.filter(user => {
            return user.name.toLowerCase().match(search)
        })
        setFilteredUsers(result)
    }, [search])

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true
        },
        {
            name: 'Create At',
            selector: row => <><Moment parse="YYYY-MM-DD HH:mm">{row.created_at}</Moment></>,
            sortable: true
        },
        {
            name: 'Actions',
            cell: row => <>
                <div onClick={() => handleEdit(row)}><FcEditImage className='text-lg'/></div> |
                <div onClick={() => handleDelete(row.id)}><AiFillDelete className='text-lg text-red-500'/></div>
            </>
        }
    ]

    const handleAdd = async () => {
        setMode(false)
        setUserID(0)
        setName('')
        setEmail('')
        setPassword('')
        setRole('user')
    }
    const handleEdit = async (user) => {
        setMode(true)
        setUserID(user.id)
        setName(user.name)
        setEmail(user.email)
        setPassword('')
        setRole(user.role)
    }
    const handleDelete = async (id) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        const response = await fetch(`${URL}admin/users/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': token,
                            },
                        })
                        const result = await response.json()
                        if (result.status === true){
                            setUsers((current) => current.filter((cur) => cur.id !== id))
                            setFilteredUsers((current) => current.filter((cur) => cur.id !== id))
                            toast.success(result.message)
                        }
                        else {
                            toast.error(result.message)
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => null
                }
            ]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setProcessing(true)
        let result = null
        if (!mode){
            const response = await fetch(`${URL}admin/users`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({name: name, email: email, password: password, role: role})
            })
            result = await response.json()
        }
        else {
            if (userID < 0){
                toast.error('No data is selected')
                return
            }
            const response = await fetch(`${URL}admin/users/${userID}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({name: name, email: email, password: password, role: role})
            })
            result = await response.json()
        }

        if (result.status === true){

            if (mode === true){
                getUsers()
            }else {
                setUsers( current => [result.user, ...current ] )
                setFilteredUsers(current => [result.user, ...current ])
            }
            setUserID(0)
            setName('')
            setEmail('')
            setPassword('')
            setRole('user')
            toast.success(result.message)
        }
        else {
            toast.error(result.message)
        }
        setProcessing(false)
    }

    return (
        <>
            <div className='block md:flex'>
                <Sidebar/>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4
                    w-full justify-center items-center p-8 space-y-4 md:space-y-0">

                    <div className="col-span-2">
                        <div className="block p-6 rounded-lg shadow-lg w-full bg-[#2D333B] text-gray-200">
                            <div className='flex justify-between items-center border-b-2 border-gray-700'>
                                <h5 className="text-3xl leading-tight font-medium mb-2">Users list</h5>
                            </div>
                            <div>
                                <DataTable
                                    className='bg-[#2D333B]'
                                    columns={columns} data={filteredUsers}
                                    pagination={10} fixedHeader fixedHeaderScrollHeight='500px' highlightOnHover
                                    subHeader subHeaderComponent={<input type='text' placeholder='Search'
                                                                         className='text-base bg-transparent w-full text-black focus:outline-none
                                                                 border-2 border-gray-300 p-2 rounded-lg shadow-lg w-80'
                                                                         value={search}
                                                                         onChange={(e) => setSearch(e.target.value)}/>}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className='p-6 rounded-lg shadow-lg bg-[#2D333B] text-gray-200 w-full'>
                            <div className='flex justify-between items-center border-b-2 border-gray-700'>
                                <h5 className="text-3xl leading-tight font-medium mb-2">
                                    {mode ? 'Edit User' : 'Add User'}
                                </h5>
                                {mode && <button className='rounded-lg px-4 py-2 bg-white hover:bg-gray-200 text-black' onClick={() => handleAdd()}>Add New</button>}
                            </div>
                            <div>
                                <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-200 text-sm font-bold mb-2"
                                               htmlFor="name">
                                            Name
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name" type="text" placeholder="Name" required value={name}
                                            onChange={(e) => setName(e.target.value)}/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-200 text-sm font-bold mb-2"
                                               htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="email" type="email" placeholder="Email" required value={email}
                                            onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-200 text-sm font-bold mb-2"
                                               htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password" type="password" placeholder="Password" required
                                            value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-200 text-sm font-bold mb-2"
                                               htmlFor="password">
                                            Role
                                        </label>
                                        <select name="role" id="role" required value={role} onChange={(e) => setRole(e.target.value)}
                                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <button type="submit" className='shadow appearance-none border rounded
                                                w-full py-2 px-3 text-gray-200 bg-gray-500 hover:bg-gray-400'
                                                disabled={processing}>Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default User