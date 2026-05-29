import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User, Tenant } from '@/types'

interface AuthState {
  user: User | null
  tenant: Tenant | null
  token: string | null
  isAuthenticated: boolean

  setAuth: (user: User, tenant: Tenant, token: string) => void
  clearAuth: () => void
  /** Call after persist rehydration to restore isAuthenticated from persisted token */
  rehydrate: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tenant: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, tenant, token) =>
        set({ user, tenant, token, isAuthenticated: true }),

      clearAuth: () => {
        set({ user: null, tenant: null, token: null, isAuthenticated: false })
        /* Wipe the persisted key so a page refresh doesn't re-hydrate a stale token */
        useAuthStore.persist.clearStorage()
      },

      rehydrate: () => {
        const { token } = get()
        if (token) set({ isAuthenticated: true })
      },
    }),
    {
      name: 'infrakey-auth',
      storage: createJSONStorage(() => localStorage),
      /* Only persist the token — user/tenant come from the /me API on next load */
      partialize: (s) => ({ token: s.token }),
      onRehydrateStorage: () => (state) => {
        /* Runs synchronously after localStorage data is loaded */
        state?.rehydrate()
      },
    }
  )
)

/** Retrieve token without subscribing to store — safe for use in services */
export function getAuthToken(): string | null {
  return useAuthStore.getState().token
}
