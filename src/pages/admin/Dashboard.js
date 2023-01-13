import React, {useState} from "react";
import Sidebar from "../../components/dashboard/Sidebar";

const Dashboard = () => {

    return (
        <>
            <div className='block md:flex'>
                <Sidebar/>

                <div>Dashboard page</div>
            </div>
        </>
    )
}

export default Dashboard