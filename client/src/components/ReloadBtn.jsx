import React from 'react'

const ReloadBtn = () => {
    return (
        <div className="group fixed bottom-4 left-4">
            
            <button
                onClick={() => window.location.reload()}
                className="bg-zinc-300 rounded-full w-16 h-16 shadow-lg flex items-center justify-center"
            >
                <img src="/reload.png" alt="icon" className="w-8 h-8" />
            </button>

            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-sm py-1 px-2 rounded-lg">
                Refresh
            </div>

        </div>
    )
}

export default ReloadBtn
