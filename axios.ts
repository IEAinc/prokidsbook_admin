import axios, { AxiosInstance } from 'axios'
import useLoadingStore from './src/stores/useLoadingStore'

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: true, // 쿠키 포함 요청
})

// const axiosInstance: AxiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL + '/api', // import.meta.env.VITE_ 접두어로 접근
//     withCredentials: true,
// })

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use((config) => {
    // 로딩 상태
    useLoadingStore.getState().setLoading(true)
    // access token Authorization 헤더에 추가
    const accessToken = document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1]
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
}, (error) => {
    useLoadingStore.getState().setLoading(false)
    return Promise.reject(error)
})

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use((response) => {
    useLoadingStore.getState().setLoading(false) // 로딩 상태 종료
    if (response.headers['content-type']?.toLowerCase() === 'application/json') {
        // XSS 필터링 처리
        let responseData = JSON.stringify(response.data)
        responseData = responseData.replace(/&amp;/gi, '&')
            .replace(/&lt;/gi, '<')
            .replace(/&gt;/gi, '>')
            .replace(/&#40;/gi, '(')
            .replace(/&#41;/gi, ')')
            .replace(/&#35;/gi, '#')

        return JSON.parse(responseData)
    }
    return response
}, (error) => {
    useLoadingStore.getState().setLoading(false) // 로딩 상태 종료
    return Promise.reject(error)
})

export default axiosInstance