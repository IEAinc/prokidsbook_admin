import axiosInstance from 'axios';
import type { DashboardData, ChartData, ApiResponse } from './types';

/**
 * 대시보드 상단 카드 통계 데이터를 가져옵니다.
 */
export const getDashboardStatics = async (): Promise<DashboardData> => {
  const response = await axiosInstance.get<DashboardData>('/statics');
  console.log('response.data', response.data)
  return response.data;
};

/**
 * 대시보드 차트 데이터를 가져옵니다.
 * @param type 데이터 종류 (visitor, download 등)
 * @param periodType 기간 종류 (LAST_7_DAYS, YEARLY_MONTHLY 등)
 * @param date 날짜
 */
export const getChartData = async (type: string, periodType: string, date: string): Promise<ChartData> => {
  const response = await axiosInstance.get<ChartData>(`/statics/chart/${type}`, { params: { periodType, date } });
  return response.data;
}