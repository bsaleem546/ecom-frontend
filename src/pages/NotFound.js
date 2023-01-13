import React from "react";

const NotFound = () => {
    return (
        <div className='min-h-screen'>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="bg-[#2D333B] w-full sm:w-3/4 max-w-lg p-12 pb-6 shadow-2xl rounded">
                    <div className="text-white pb-4 text-5xl font-bold">
                        Page not found !!! <br/>
                    </div>
                    <div className="text-white pb-4 text-2xl font-bold">
                        Your requested page do not exists.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound