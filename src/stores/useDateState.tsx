import { create } from 'zustand'

interface YearDataStore {
    data: string[] | null
    error: string | null
    setData: (data: string[]) => void
}

export const useYearDataStore = create<YearDataStore>((set) => ({
    data: null,
    error: null,
    setData: (data) => set({ data })
}))