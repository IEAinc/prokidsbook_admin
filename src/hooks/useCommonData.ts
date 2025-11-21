import { useEffect } from "react"
import axiosInstance from '../api/axios'
import { useYearDataStore } from './../stores/useDateState'

export function useYearData() {
  const { data, error, setData } = useYearDataStore()

  useEffect(() => {
    // 로컬스토리지에서 데이터를 가져옴
    const storedYearData = localStorage.getItem('yearData')

    if (storedYearData) {
      // 로컬스토리지에 데이터가 있으면 그 데이터를 사용
      setData(JSON.parse(storedYearData))
    } else {
      // 로컬스토리지에 데이터가 없으면 API 호출
      axiosInstance.get<string[]>('/getPeriod/year')
        .then((response) => {
          const fetchedData: string[] = response as any || []
          setData(fetchedData)
          localStorage.setItem('yearData', JSON.stringify(fetchedData)) // 로컬스토리지에 저장
        })
        .catch((err) => {
          console.error(err)
          setData([]) // API 호출 실패 시 빈 배열 설정
        })
    }
  }, [setData])

  return { data, error }
}