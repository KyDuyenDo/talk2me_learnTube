// auth.actions.ts
import { loginUser, refreshToken } from "../../api/auth/auth.service";

export const login = (formData: FormData) => async (dispatch: any) => {
    try {
        const res = await loginUser(formData);
        if (res.error) {
            throw new Error(res.error);
        }
        dispatch({
            type: "LOGIN",
            payload: {
                accessToken: res?.data?.accessToken,
                user: res?.data?.user,
            },
        });
        const profile = {
            accessToken: res?.data?.accessToken,
            user: res?.data?.user,
        };
        localStorage.setItem("profile", JSON.stringify(profile));
        // redirect
        window.location.href = "/";
    } catch (error) {
        console.error("Login failed:", error);
        dispatch({ type: "LOGIN_FAILED", payload: error });
    }
};

export const logout = () => (dispatch: any) => {
    localStorage.removeItem("profile");
    dispatch({ type: "LOGOUT" });
};

export const refresh = () => async (dispatch: any) => {
    try {
        const res = await refreshToken();
        if (res.error) {
            throw new Error(res.error);
        }
        dispatch({ type: "LOAD_USER", payload: res?.data });
    } catch (error) {
        console.error("Refresh token failed:", error);
        dispatch({ type: "LOGOUT" }); // nếu refresh fail thì logout
    }
};
