import {AuthContext} from "./AuthContext.js";
import {USER_KEY, DEFAULT_USER} from "../constants/Enum.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import {useState} from "react";
import {checkCredentials, sleep} from "../utils/Utils.js";
import {toast} from "react-toastify";

export function AuthProvider({children}) {
    const [user, setUser] = useLocalStorage(USER_KEY, DEFAULT_USER);
    const [localUser, setLocalUser] = useState(DEFAULT_USER);

    const login = async (userData) => {
        await sleep(1000);
        if (checkCredentials(userData)) {
            if (userData.rememberMe) {
                setUser({
                    email: userData.email,
                    isAuthenticated: true,
                });
            } else {
                setLocalUser({
                    email: userData.email,
                    isAuthenticated: true,
                });
            }
            toast.success('Logged in successfully!');
            return true;
        } else {
            toast.error('Invalid email or password.');
            return false;
        }
    };

    const logout = () => {
        setUser(DEFAULT_USER);
        setLocalUser(DEFAULT_USER);
    };

    const contextValue = {
        login,
        logout,
        isAuthenticated: user?.isAuthenticated || localUser?.isAuthenticated || false,
        user: user?.isAuthenticated ? user : localUser?.isAuthenticated ? localUser : null,
    };

    return (<AuthContext value={contextValue}>{children}</AuthContext>);
}
