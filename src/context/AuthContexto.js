'use client'

import {useContext, createContext, useState } from "react";

const AuthContexto = createContext();


export function AuthProvider({children, value}) {
    const [authuser, setUser] = useState(null);
    return <AuthContexto.Provider value={{ authuser, setUser }}>{children}</AuthContexto.Provider>
}


export function useAuthValue() {
    return useContext(AuthContexto)
}