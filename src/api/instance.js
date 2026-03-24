import axios from 'axios'
import { getToken } from './auth'

const instance = axios.create({
  baseURL: 'https://unpercipient-woodrow-nonrecurent.ngrok-free.dev',
  timeout: 10000,
  headers: {
    'ngrok-skip-browser-warning': '69420'
  }
})

// 모든 요청에 JWT 토큰 자동 첨부
instance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 응답 에러 처리
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 로그인 페이지로 이동
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
    }
    if (error.response?.status >= 500) {
      console.error('서버 오류! 팀장에게 연락하세요.')
    }
    return Promise.reject(error)
  }
)

export default instance
