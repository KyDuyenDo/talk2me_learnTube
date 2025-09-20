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

export type AuthAction =
  | { type: "LOGIN"; payload: { user: User; accessToken: string } }
  | { type: "REFRESH"; payload: { accessToken: string } }
  | { type: "LOGOUT" }
  | { type: "LOAD_USER"; payload: { user: User; accessToken: string } }