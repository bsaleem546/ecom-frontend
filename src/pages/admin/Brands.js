import React, {useState} from "react";
import Sidebar from "../../components/dashboard/Sidebar";

const Brands = () => {

    const URL = process.env.REACT_APP_API_URL
    const token = 'Bearer ' + localStorage.getItem('token')
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [search, setSearch] = useState()
    const [mode, setMode] = useState(false)

    const [brandID, setBrandID] = useState(0)
    const [brand, setBrand] = useState('')
    const [brandImage, setBrandImage] = useState(null)
    const [processing, setProcessing] = useState(false)

    const handleAdd = () => {
        setMode(false)
        setBrandID(0)
        setBrand('')
        setBrandImage(null)
    }

    const fileChangeHandler = (e) => {
        console.log(e);
    }

    const handleSubmit = async (e) => {}
    return (
        <>
            <div className='block md:flex'>
                <Sidebar/>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4
                    w-full justify-center items-center p-8 space-y-4 md:space-y-0">

                    <div className="col-span-2"></div>

                    <div className="flex justify-between items-center">
                        <div className='p-6 rounded-lg shadow-lg bg-[#2D333B] text-gray-200 w-full'>
                            <div className='flex justify-between items-center border-b-2 border-gray-700'>
                                <h5 className="text-3xl leading-tight font-medium mb-2">
                                    {mode ? 'Edit Brand' : 'Add Brand'}
                                </h5>
                                {mode && <button className='rounded-lg px-4 py-2 bg-white hover:bg-gray-200 text-black' onClick={() => handleAdd()}>Add New</button>}
                            </div>

                            <div>
                                <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-200 text-sm font-bold mb-2"
                                               htmlFor="name">
                                            Brand Name
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name" type="text" placeholder="Brand Name" required value={brand}
                                            onChange={(e) => setBrand(e.target.value)}/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-200 text-sm font-bold mb-2"
                                               htmlFor="name">
                                            Brand Image
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name" type="file" accept="image/*"
                                            onChange={fileChangeHandler}/>
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

export default Brands