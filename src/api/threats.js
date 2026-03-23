import instance from './instance'

// API 4: 위협 검색
export const searchThreats = async (params) => {
  const response = await instance.post('/api/v1/threats/search', params)
  return response.data
}

// API 5: 위협 조치 업데이트
export const updateThreatAction = async (data) => {
  const response = await instance.patch('/api/v1/threats/action', data)
  return response.data
}
