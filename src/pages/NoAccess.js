import React from "react";

const NoAccess = () => {
    return (
        <div className='min-h-screen'>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="bg-[#2D333B] w-full sm:w-3/4 max-w-lg p-12 pb-6 shadow-2xl rounded">
                    <div className="text-white pb-4 text-5xl font-bold">
                        Sorry !!!
                    </div>
                    <div className="text-white pb-4 text-2xl font-bold">
                        You do not have access to this url
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoAccess