import React, { createContext, useEffect, useState } from "react";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const url = 'https://lama-backend-n6l3.onrender.com/api'
    const [token, setToken] = useState('')
    const [currentProjectId, setCurrentProjectId] = useState('')

    useEffect(()=> {
        
        async function loadData() {
            if (localStorage.getItem('token')){
                setToken(localStorage.getItem('token'))
            }
        }
        loadData();
    }, [])

    const contextValue = {
        url,
        token,
        setToken,
        currentProjectId,
        setCurrentProjectId
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider