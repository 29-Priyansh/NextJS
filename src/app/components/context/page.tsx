"use client";

import { createContext } from "react";

export const Context = createContext();

export const ContextProvider = ({children}) => {
    return (<Context.Provider value={{girl:"sexy"}}>{children}</Context.Provider>);
}