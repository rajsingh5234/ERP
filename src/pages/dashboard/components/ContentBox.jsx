import React from 'react'

const ContentBox = ({ children, className }) => {
    return (
        <div className={` ${className} bg-white bg-clip-border rounded-xl text-primary border shadow-sm`}>
            {children}
        </div>
    )
}

export default ContentBox