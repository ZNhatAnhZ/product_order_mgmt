import {AuthContext} from "./AuthContext.js";
import {UserKey, DefaultUser} from "../constants/Enum.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import {useState} from "react";

export function AuthProvider({children}) {
    const [user, setUser] = useLocalStorage(UserKey, DefaultUser);
    const [localUser, setLocalUser] = useState(DefaultUser);

    const login = (userData) => {
        if (userData.rememberMe) {
            setUser({
                ...userData,
                isAuthenticated: true,
            });
        } else {
            setLocalUser({
                ...userData,
                isAuthenticated: true,
            });
        }
    };

    const logout = () => {
        setUser(DefaultUser);
        setLocalUser(DefaultUser);
    };

    const contextValue = {
        login,
        logout,
        isAuthenticated: user?.isAuthenticated || localUser?.isAuthenticated || false,
        user
    };

    return (
        <AuthContext value={contextValue}>
            {children}
        </AuthContext>
    );
}
