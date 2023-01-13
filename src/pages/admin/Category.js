import React, {useEffect, useState} from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import DataTable from "react-data-table-component";
import Moment from "react-moment";
import {FcEditImage} from "react-icons/fc";
import {AiFillDelete} from "react-icons/ai";
import toast from "react-hot-toast";
import {confirmAlert} from "react-confirm-alert";

const Category = () => {

    const URL = process.env.REACT_APP_API_URL
    const token = 'Bearer ' + localStorage.getItem('token')
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [search, setSearch] = useState()
    const [mode, setMode] = useState(false)

    const [catID, setCatID] = useState(0)
    const [category, setCategory] = useState()
    const [processing, setProcessing] = useState(false)

    const getData = async () => {
        try {
            const response = await fetch(`${URL}admin/categories`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });
            const result = await response.json();
            setData(result)
            setFilteredData(result)
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        const result = data.filter(d => {
            return d.category.toLowerCase().match(search)
        })
        setFilteredData(result)
    }, [search])
    const columns = [
        {
            name: 'Category',
            selector: row => row.category,
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

    const handleAdd = () => {
        setMode(false)
        setCatID(0)
        setCategory('')
    }
    const handleEdit = (data) => {
        setMode(true)
        setCatID(data.id)
        setCategory(data.category)
    }
    const handleDelete = async (id) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        const response = await fetch(`${URL}admin/categories/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': token,
                            },
                        })
                        const result = await response.json()
                        if (result.status === true){
                            setData((current) => current.filter((cur) => cur.id !== id))
                            setFilteredData((current) => current.filter((cur) => cur.id !== id))
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
            const response = await fetch(`${URL}admin/categories`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({category: category})
            })
            result = await response.json()
        }
        else {
            if (catID < 0){
                toast.error('No data is selected')
                return
            }
            const response = await fetch(`${URL}admin/categories/${catID}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({category: category})
            })
            result = await response.json()
        }
        if (result.status === true){

            if (mode === true){
                getData()
            }else {
                setData( current => [result.data, ...current ] )
                setFilteredData(current => [result.data, ...current ])
            }
            setCatID(0)
            setCategory('')
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
                                <h5 className="text-3xl leading-tight font-medium mb-2">Categories list</h5>
                            </div>
                            <div>
                                <DataTable
                                    className='bg-[#2D333B]'
                                    columns={columns} data={filteredData}
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
                                    {mode ? 'Edit Category' : 'Add Category'}
                                </h5>
                                {mode && <button className='rounded-lg px-4 py-2 bg-white hover:bg-gray-200 text-black' onClick={() => handleAdd()}>Add New</button>}
                            </div>

                            <div>
                                <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-200 text-sm font-bold mb-2"
                                               htmlFor="name">
                                            Category Name
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name" type="text" placeholder="Category Name" required value={category}
                                            onChange={(e) => setCategory(e.target.value)}/>
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

export default Category