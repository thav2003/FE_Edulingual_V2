import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface AppState {
  isRefecth: boolean
  refetchApp: () => void
}

const storeApi: StateCreator<AppState> = (set) => ({
  isRefecth: false,

  refetchApp: () => {
    set((state) => ({ isRefecth: !state.isRefecth }))
  }
})

export const useAppStore = create<AppState>()(devtools(persist(storeApi, { name: 'app-storage' })))
