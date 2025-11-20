import { create } from 'zustand'

interface LoadingState {
    loading: boolean
    setLoading: (loading: boolean) => void
}

const useLoadingStore = create<LoadingState>((set) => ({
    loading: localStorage.getItem('loading') === 'true',
    setLoading: (loading) => {
        localStorage.setItem('loading', String(loading))
        set({ loading })
    },
}))

export default useLoadingStore