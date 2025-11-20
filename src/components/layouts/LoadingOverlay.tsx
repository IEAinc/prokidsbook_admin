import React from 'react'
import useLoadingStore from '../../stores/useLoadingStore.tsx'

const LoadingOverlay: React.FC = () => {
    const loading = useLoadingStore((state) => state.loading)

    return (
        loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="text-white text-lg">로딩 중...</div>
            </div>
        )
    )
}

export default LoadingOverlay