import React, { createContext, useState } from 'react'

export const addData = createContext();
export const updateData = createContext();
export const dltdata = createContext();

const ContextProvider = ({ children }) => {

    const [useradd, setUseradd] = useState("");

    return (
        <>
            <addData.Provider value={{ useradd, setUseradd }}>{children}</addData.Provider>
        </>
    )
}

export default ContextProvider