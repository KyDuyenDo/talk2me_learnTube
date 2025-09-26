// Zustand store (client state)
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
    id: string;
    email: string;
    name: string;
}

type AuthState = {
    user: User | null;
    accessToken: string | null;
    redirectPath: string | null;
} | undefined

type AuthActions = {
    setUser: (user: User | null) => void;
    setAccessToken: (accessToken: string | null) => void;
    setRedirectPath: (redirectPath: string | null) => void;
    setLogout: () => void
}

export const useUserStore = create<AuthState & AuthActions>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            redirectPath: null,
            setUser: (user) => set({ user }),
            setAccessToken: (accessToken) => set({ accessToken }),
            setRedirectPath: (redirectPath) => set({ redirectPath }),
            setLogout: () => {
                const currentPath = window.location.pathname + window.location.search;
                set({
                    user: null,
                    accessToken: null,
                    redirectPath: currentPath
                })
                window.location.href = "/login"
            }
        }),
    { 
        name: "accessToken",
    }
    )
)