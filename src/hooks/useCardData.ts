import { useState, useEffect } from 'react'
import axiosInstance from './../../axios'

/**
 * /statics 요약 API 응답 타입
 * (현재 카드에서 쓰고 있는 실제 구조 기준)
 */
interface SummaryCountData {
  today: number
  last7DaysTotal: number
  thisMonthTotal: number
  total: number
  delta: number
}

// visitor, download 용
interface SummaryVisitorDownload {
  today: number
  last7DaysTotal: number
  thisMonthTotal: number
  total: number
  delta: number
}

// account, stories, characters 용
interface SummaryAccountStoriesCharacters {
  created: SummaryCountData
  deleted: SummaryCountData
}

interface DashboardSummaryApiResponse {
  visitor: SummaryVisitorDownload
  download: SummaryVisitorDownload
  account: SummaryAccountStoriesCharacters
  stories: SummaryAccountStoriesCharacters
  characters: SummaryAccountStoriesCharacters
}

/**
 * 화면에서 사용할 카드 1개 타입
 */
export interface DashboardDataDetails {
  today: string
  todayCount: string
  week: string
  month: string
  monthCount: string
  total: string
}

/**
 * 화면에서 사용할 대시보드 카드 전체 타입
 */
export interface DashboardData {
  visitor: DashboardDataDetails
  download: DashboardDataDetails
  account: DashboardDataDetails
  stories: DashboardDataDetails
  characters: DashboardDataDetails
}

/**
 * delta 포맷팅
 */
const formatDelta = (delta?: number | null): string => {
  if (delta == null || delta === 0) return '-'
  return delta > 0 ? `+${delta}` : String(delta)
}

/**
 * visitor / download 카드용 매핑
 *  - today, week, month, total, delta 그대로 사용
 */
const mapVisitorDownload = (src?: SummaryVisitorDownload): DashboardDataDetails => {
  if (!src) {
    return {
      today: '-',
      todayCount: '-',
      week: '-',
      month: '-',
      monthCount: '',
      total: '-',
    }
  }

  return {
    today: String(src.today ?? '-'),
    todayCount: formatDelta(src.delta),
    week: String(src.last7DaysTotal ?? '-'),
    month: String(src.thisMonthTotal ?? '-'),
    monthCount: '',
    total: String(src.total ?? '-'),
  }
}

/**
 * account / stories / characters 카드용 매핑
 *  - today / todayCount / week 는 created 기준
 *  - month / monthCount / total 은 deleted 기준
 *    (기존 코드 로직과 동일하게 맞춤)
 */
const mapAccountStoriesCharacters = (
  src?: SummaryAccountStoriesCharacters
): DashboardDataDetails => {
  const created = src?.created
  const deleted = src?.deleted

  return {
    today: created ? String(created.today ?? '-') : '-',
    todayCount: formatDelta(created?.delta),
    week: created ? String(created.last7DaysTotal ?? '-') : '-',
    month: deleted ? String(deleted.today ?? '-') : '-',
    monthCount: formatDelta(deleted?.delta),
    total: deleted ? String(deleted.total ?? '-') : '-',
  }
}

/**
 * 대시보드 카드 데이터 훅
 *  - /statics 호출해서 카드 5개 한 번에 구성
 *  - 차트 훅처럼: axios 호출 → 타입 지정 → 매핑 → 화면용 데이터 반환
 */
export function useCardData() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // axiosInstance 응답 인터셉터가 data만 반환한다고 가정
        // (실제론 AxiosResponse<T> 타입이지만, 런타임은 T 이므로 한 번 캐스팅)
        const res = await axiosInstance.get<DashboardSummaryApiResponse>('/statics')
        const apiData = res as unknown as DashboardSummaryApiResponse

        setData({
          visitor: mapVisitorDownload(apiData.visitor),
          download: mapVisitorDownload(apiData.download),
          account: mapAccountStoriesCharacters(apiData.account),
          stories: mapAccountStoriesCharacters(apiData.stories),
          characters: mapAccountStoriesCharacters(apiData.characters),
        })
      } catch (e) {
        setError('오류')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, error, loading }
}

/**
 * 상세 페이지에서 사용할 타입
 */
export type DashboardDetailType =
  | 'visitor'
  | 'download'
  | 'account'
  | 'stories'
  | 'characters'

/**
 * detail 페이지 카드 데이터 훅
 *  - /statics/:type 에서 이미 카드 형태(DashboardDataDetails)로 내려온다고 가정
 *  - 차트 훅이랑 느낌 맞게: axios → 타입 지정 후 그대로 set
 */
export function useDetailData(type: DashboardDetailType) {
  const [data, setData] = useState<DashboardDataDetails | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        setLoading(true)

        const res = await axiosInstance.get<DashboardDataDetails>(`/statics/${type}`)
        const detailData = res as unknown as DashboardDataDetails

        setData(detailData)
      } catch (e) {
        setError('오류')
      } finally {
        setLoading(false)
      }
    }

    fetchDetailData()
  }, [type])

  return { data, error, loading }
}
