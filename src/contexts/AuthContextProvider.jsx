import {AuthContext} from "./AuthContext.js";
import {UserKey, DefaultUser} from "../constants/Enum.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import {useState} from "react";
import {checkCredentials, sleep} from "../utils/Utils.js";
import {toast} from "react-toastify";

export function AuthProvider({children}) {
    const [user, setUser] = useLocalStorage(UserKey, DefaultUser);
    const [localUser, setLocalUser] = useState(DefaultUser);

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
        setUser(DefaultUser);
        setLocalUser(DefaultUser);
    };

    const contextValue = {
        login,
        logout,
        isAuthenticated: user?.isAuthenticated || localUser?.isAuthenticated || false,
        user: user?.isAuthenticated ? user : localUser?.isAuthenticated ? localUser : null,
    };

    return (
        <AuthContext value={contextValue}>{children}</AuthContext>
    );
}
