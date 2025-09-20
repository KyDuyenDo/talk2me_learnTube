import type { AuthState, AuthAction } from "./types";
import { initialState } from "./types";
export const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                accessToken: action.payload.accessToken,
                user: action.payload.user,
                loading: false
            }
        case "LOAD_USER":
            return {
                ...state,
                accessToken: action.payload.accessToken,
                user: action.payload.user,
                loading: false
            }
        case "REFRESH":
            return {
                ...state,
                accessToken: action.payload.accessToken,
            }
        case "LOGOUT":
            return {
                ...state,
                accessToken: "",
                user: null,
                loading: false
            }
        default:
            return state;
    }
}

export default authReducer;