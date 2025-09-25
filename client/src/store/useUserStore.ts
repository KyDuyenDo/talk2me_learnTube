// Zustand store (client state)
import { create } from 'zustand'
import {persist} from 'zustand/middleware'

type User = {
    id: string;
    email: string;
    name: string;
}

type AuthState = {
    user: User | null;
    accessToken: string | null;
}

type AuthActions = {
    setUser: (user: User | null) => void;
    setAccessToken: (accessToken: string | null) => void;
}

export const useUserStore = create<AuthState & AuthActions>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            setUser: (user) => set({ user }),
            setAccessToken: (accessToken) => set({ accessToken }),
        }),
    { name: "accessToken" }
    )
)