import axios, { type AxiosInstance } from 'axios'
import useLoadingStore from '../stores/useLoadingStore'

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    useLoadingStore.getState().setLoading(true)

    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    useLoadingStore.getState().setLoading(false)
    return Promise.reject(error)
  }
)

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    useLoadingStore.getState().setLoading(false)

    if (response.headers['content-type']?.toLowerCase() === 'application/json') {
      let responseData = JSON.stringify(response.data)
      responseData = responseData
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&#40;/gi, '(')
        .replace(/&#41;/gi, ')')
        .replace(/&#35;/gi, '#')

      return JSON.parse(responseData)
    }

    return response
  },
  (error) => {
    useLoadingStore.getState().setLoading(false)
    return Promise.reject(error)
  }
)

export default axiosInstance
