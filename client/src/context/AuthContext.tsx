import { createContext, useEffect, useReducer, useContext } from "react";
import { authReducer, initialState } from "../reducers/authReducer";
import { loginUser, refreshToken } from "../api/auth/auth.service";

interface AuthContextProps {
    login: (formData: FormData) => Promise<void>;
    logout: () => void;
    refresh: (formData: FormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    login: async () => { },
    logout: () => { },
    refresh: async () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)
    useEffect(() => {
        const accessToken = JSON.parse(localStorage.getItem("profile") || "null")?.accessToken;
        const user = JSON.parse(localStorage.getItem("profile") || "null")?.user;
        if (accessToken) {
            dispatch({
                type: "LOAD_USER", payload: {
                    accessToken,
                    user,
                }
            })
        } else {
            dispatch({ type: "LOGOUT" });
        }

    }, [])

    const login = async (formData: FormData) => {
        try {
            const res = await loginUser(formData);
            dispatch({
                type: "LOGIN",
                payload: {
                    accessToken: res?.data?.accessToken,
                    user: res?.data?.user,
                }
            });
            const profile = {
                accessToken: res?.data?.accessToken,
                user: res?.data?.user,
            }
            localStorage.setItem("profile", JSON.stringify(profile));
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    }
    const logout = () => {
        dispatch({ type: "LOGOUT" });
    }

    const refresh = async () => {
        try {
            const res = await refreshToken();
            if (res.error) {
                throw new Error(res.error);
            }
            dispatch({ type: "LOAD_USER", payload: res?.data });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (state.accessToken) {
            const interval = setInterval(() => {
                refresh();
            }, 0.5 * 60 * 1000);
            return () => clearInterval(interval);
        }
    }, [state.accessToken, refresh]);

    return (
        <AuthContext.Provider value={{
            ...state,
            login,
            logout,
            refresh,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};