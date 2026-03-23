import instance from './instance'

// API 2: 대시보드 통계 데이터
export const getDashboardStats = async () => {
  const response = await instance.post('/api/v1/dashboard/statistics')
  return response.data
}

// API 3: 실시간 탐지 현황 (최근 1시간)
export const getRecentThreats = async () => {
    const response = await instance.post("/api/v1/dashboard/realtime");
    return response.data;
}
