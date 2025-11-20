import { useState, useEffect } from 'react'
import axiosInstance from './../../axios'

interface DashboardData {
    visitor: DashboardDataDetails
    download: DashboardDataDetails
    account: DashboardDataDetails
    stories: DashboardDataDetails
    characters: DashboardDataDetails
}

interface CountData {
    today: string
    last7DaysTotal: string
    thisMonthTotal: string
    total: string
}

interface DashboardDataDetails {
    today: string
    todayCount: string
    week: string
    month: string
    monthCount: string
    total: string
    common?: CountData
    created?: CountData
    deleted?: CountData
}

//대시보드 카드 데이터
export function useCardData() {
    const [data, setData] = useState<DashboardData | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/statics')
                const data = response as any

                setData({
                    visitor: {
                        today: String(data?.visitor?.today ?? '-'),
                        todayCount: data?.visitor?.delta != null && data?.visitor?.delta !== 0 ? (data?.visitor?.delta >= 0 ? `+${data?.visitor?.delta}` : `${data?.visitor?.delta}`) : '-',
                        week: String(data?.visitor?.last7DaysTotal ?? '-'),
                        month: String(data?.visitor?.thisMonthTotal ?? '-'),
                        monthCount: '',
                        total: String(data?.visitor?.total ?? '-'),
                    },
                    download: {
                        today: String(data?.download?.today ?? '-'),
                        todayCount: data?.download?.delta != null && data?.download?.delta !== 0 ? (data?.download?.delta >= 0 ? `+${data?.download?.delta}` : `${data?.download?.delta}`) : '-',
                        week: String(data?.download?.last7DaysTotal ?? '-'),
                        month: String(data?.download?.thisMonthTotal ?? '-'),
                        monthCount: '',
                        total: String(data?.download?.total ?? '-'),
                    },
                    account: {
                        today: String(data?.account?.created?.today ?? '-'),
                        todayCount: data?.account?.created?.delta != null && data?.account?.created?.delta !== 0 ? (data?.account?.created?.delta >= 0 ? `+${data?.account?.created?.delta}` : `${data?.account?.created?.delta}`) : '-',
                        week: String(data?.account?.created?.last7DaysTotal ?? '-'),
                        month: String(data?.account?.deleted?.today ?? '-'),
                        monthCount: data?.account?.deleted?.delta != null && data?.account?.deleted?.delta !== 0 ? (data?.account?.deleted?.delta >= 0 ? `+${data?.account?.deleted?.delta}` : `${data?.account?.deleted?.delta}`) : '-',
                        total: String(data?.account?.deleted?.total ?? '-'),
                    },
                    stories: {
                        today: String(data?.stories?.created?.today ?? '-'),
                        todayCount: data?.stories?.created?.delta != null && data?.stories?.created?.delta !== 0 ? (data?.stories?.created?.delta >= 0 ? `+${data?.stories?.created?.delta}` : `${data?.stories?.created?.delta}`) : '-',
                        week: String(data?.stories?.created?.total ?? '-'),
                        month: String(data?.stories?.deleted?.today ?? '-'),
                        monthCount: data?.stories?.deleted?.delta != null && data?.stories?.deleted?.delta !== 0 ? (data?.stories?.deleted?.delta >= 0 ? `+${data?.stories?.deleted?.delta}` : `${data?.stories?.deleted?.delta}`) : '-',
                        total: String(data?.stories?.deleted?.total ?? '-'),
                    },
                    characters: {
                        today: String(data?.characters?.created?.today ?? '-'),
                        todayCount: data?.characters?.created?.delta != null && data?.characters?.created?.delta !== 0 ? (data?.characters?.created?.delta >= 0 ? `+${data?.characters?.created?.delta}` : `${data?.characters?.created?.delta}`) : '-',
                        week: String(data?.characters?.created?.total ?? '-'),
                        month: String(data?.characters?.deleted?.today ?? '-'),
                        monthCount: data?.characters?.deleted?.delta != null && data?.characters?.deleted?.delta !== 0 ? (data?.characters?.deleted?.delta >= 0 ? `+${data?.characters?.deleted?.delta}` : `${data?.characters?.deleted?.delta}`) : '-',
                        total: String(data?.characters?.deleted?.total ?? '-'),
                    },
                })
            } catch (error) {
                setError('오류')
            }
        }

        fetchData()
    }, [])

    return { data, error }
}

// detail 페이지 카드 데이터
export function useDetailData(type: 'visitor' | 'download' | 'account' | 'stories' | 'characters') {
    const [data, setData] = useState<DashboardDataDetails | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchDetailData = async () => {
            try {
                const response = await axiosInstance.get(`/statics/${type}`)
                const detailData = response as any

                setData(detailData)
            } catch (error) {
                setError('오류')
            }
        }

        fetchDetailData()
    }, [type])

    return { data, error }
}