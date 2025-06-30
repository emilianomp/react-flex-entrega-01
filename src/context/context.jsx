import React, { createContext, useContext } from "react";

// 1. Create the context
const AppContext = createContext();

// 2. Custom hook for consuming context
export const useAppContext = () => useContext(AppContext);

// 3. Context provider component
export const ContextProvider = ({ children }) => {
    const numero = 1; // Provide any state or value you need here

    return (
        <AppContext.Provider value={{ numero }}>
            {children}
        </AppContext.Provider>
    );
};