import React from 'react';

const Watermark = ({admin}) => {
    return (
        <div className='w-full fixed h-screen z-[2] flex items-center justify-center'>
            <h1 className='text-[9vw] leading-none tracking-tighter font-semibold blur-[1px] text-zinc-200'>
                MIT Connect. {admin}
            </h1>
        </div>
    );
};

export default Watermark;
