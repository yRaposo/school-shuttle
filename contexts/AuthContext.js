import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { api } from "../libs/api";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [token, setToken] = useState(null);
    const [authIsLoading, setAuthIsLoading] = useState(false);

    useEffect(() => {
        async function retrieveToken() {
            setAuthIsLoading(true);
            const storedToken = await AsyncStorage.getItem("school-shuttle");
            if (storedToken) {
                setToken(storedToken);
                api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
            }
            setAuthIsLoading(false);
        }
        retrieveToken();
    }, []);

    async function saveToken(newToken) {
        await AsyncStorage.setItem("school-shuttle", newToken);
        setToken(newToken);
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
    }

    async function logout() {
        await AsyncStorage.removeItem("school-shuttle");
        setToken(null);
        delete api.defaults.headers.common.Authorization;
    }

    return (
        <AuthContext.Provider value={{ token, authIsLoading, saveToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}