import useAxios from '../api/useAxios';
import type { DashboardData, ChartData } from './types';

/* 대시보드 상단 카드 통계 데이터 */
export const getDashboardStatics = async (): Promise<DashboardData> => {
  const axios = useAxios();

  const response = await axios.get<DashboardData>('/statics');
  return response.data;
};

/**
 * 대시보드 차트 데이터
 * @param type 데이터 종류 (visitor, download )
 * @param periodType 기간 종류 (LAST_7_DAYS, YEARLY_MONTHLY )
 * @param date 날짜
 */
export const getChartData = async (type: string, periodType: string, date: string): Promise<ChartData> => {
  const axios = useAxios();
  
  const response = await axios.get<ChartData>(`/statics/chart/${type}`, { params: { periodType, date } });
  return response.data;
}