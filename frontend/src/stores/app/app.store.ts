import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface AppState {
  refetch: boolean
  refetchApp: () => void
}

const storeApi: StateCreator<AppState> = (set) => ({
  refetch: false,

  refetchApp: () => {
    set((state) => ({ refetch: !state.refetch }))
  }
})

export const useAppStore = create<AppState>()(devtools(persist(storeApi, { name: 'app-storage' })))
