export interface User {
    id: string;
    email: string;
    name: string;
}

export interface AuthState {
    accessToken: string;
    user: User | null;
    loading: boolean;
}

export const initialState: AuthState = {
    accessToken: "",
    user: null,
    loading: true
}

export type AuthAction = | {
        type: "LOGIN";
        payload: {
            user: User;
            accessToken: string;
        }
    } | {
        type: "REFRESH";
        payload: {
            accessToken: string
        }
    } | {
        type: "LOGOUT"
    } | {
        type: "LOAD_USER";
        payload: {
            user: User;
            accessToken: string;
        }
    }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                accessToken: action.payload.accessToken,
                user: action.payload.user,
                loading: false
            }
        default:
            return state;
    }
}