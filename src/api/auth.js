const BASE_URL = 'https://unpercipient-woodrow-nonrecurent.ngrok-free.dev'

// 테스트용 슈퍼 토큰
const SUPER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInVzZXJJZCI6MSwicm9sZSI6IlNVUEVSX0FETUlOIiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfU1VQRVJfQURNSU4iLCJBRE1JTiIsIlNVUEVSX0FETUlOIl0sImlhdCI6MTc3NDExMjAwMCwiZXhwIjoxODc0MTEyMDAwfQ.7XdBSD7x-ZU0tl4E1HRKpU4NG84InJwvtIQHJ9bZStE'

export const saveToken = (token) => {
  localStorage.setItem('accessToken', token)
}

export const getToken = () => {
  // 저장된 토큰 없으면 테스트 토큰 사용
  return localStorage.getItem('accessToken') || SUPER_TOKEN
}

export const removeToken = () => {
  localStorage.removeItem('accessToken')
}

export const BASE_URL_API = BASE_URL
