import { useState, useEffect } from 'react'
import axiosInstance from './../../axios.ts'

interface ChartItem {
    date: string
    value: number
}

interface ChartData {
    common?: ChartItem[]
    created?: ChartItem[] | null
    deleted?: ChartItem[] | null
}

interface Params {
    type: 'visitor' | 'download' | 'account' | 'characters' | 'stories'
    periodType: 'LAST_7_DAYS' | 'MONTHLY_WEEKLY' | 'YEARLY_MONTHLY' | 'YEARLY'
    date?: string
}

const useChartData = ({ type, periodType, date }: Params) => {
    const [chartData, setChartData] = useState<ChartData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true)
                const params = {
                    periodType,
                    ...(date && { date }),
                }

                // response 자체가 데이터이므로 직접 사용
                const response = await axiosInstance.get<ChartData>(`/statics/${type}/chart`, { params })
                setChartData(response as ChartData) // response를 직접 사용
            } catch (err) {
                setError((err as any)?.response?.data?.message || '오류 발생')
            } finally {
                setLoading(false)
            }
        }

        fetchChartData()
    }, [type, periodType, date])

    return { chartData, loading, error }
}

export default useChartData