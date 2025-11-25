/**
 * 공통 응답 데이터 포맷
 */
export interface ApiResponse<T> {
  status: number;
  data: T;
  message?: string;
}

/**
 * 대시보드 관련 타입
 */
export interface CountData {
  today: number;
  last7DaysTotal: number;
  thisMonthTotal: number;
  total: number;
  delta?: number;
}

export interface DashboardDataDetails {
  common?: CountData;
  created?: CountData;
  deleted?: CountData;
}

export interface DashboardData {
  visitor: DashboardDataDetails;
  download: DashboardDataDetails;
  account: DashboardDataDetails;
  stories: DashboardDataDetails;
  characters: DashboardDataDetails;
}

/**
 * 차트 데이터 관련 타입
 */
export interface ChartItem {
  date: string;
  value: number;
}

export interface ChartData {
  common?: ChartItem[];
  created?: ChartItem[];
  deleted?: ChartItem[];
}

/**
 * 사용자 및 이미지 상세 관련 타입
 */

// 사용자 정보
export interface User {
  id: string;
  userName: string;
  userImage: string;
}

// 프롬프트 정보
export interface Prompt {
  words: string[];
  originalText?: string;
}

// 캐릭터 정보
export interface Character {
  id: string;
  image: string;
  createdAt: string;
  prompt: Prompt;
  creator: User;
  isDeleted?: boolean;
  isBanned?: boolean;
  stories?: Story[]; // 캐릭터로 만든 동화 목록
}

// 동화 페이지 구성
export interface StoryPage {
  image: string;
  content: string;
  prompt: Prompt;
  createdAt: string;
}

// 동화 정보
export interface Story {
  id: string;
  title: string;
  createdAt: string;
  characterId: string | null;
  pages: StoryPage[];
}

// 날짜별 이미지 그룹
export interface ImageGroup {
  title: string;
  date: string;
  characters: Character[];
}