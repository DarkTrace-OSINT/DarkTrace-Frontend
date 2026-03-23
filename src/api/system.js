import instance from './instance'

// API 6: 엔진 상태 모니터링
export const getEngineStatus = async () => {
  const response = await instance.post('/api/v1/system/engines')
  return response.data
}

// API 7: 시스템 설정 수정
export const updateSystemSettings = async (data) => {
  const response = await instance.put('/api/v1/system/settings', data)
  return response.data
}
