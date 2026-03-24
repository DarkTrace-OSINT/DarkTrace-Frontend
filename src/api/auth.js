const BASE_URL = 'https://unpercipient-woodrow-nonrecurent.ngrok-free.dev'

export const saveToken = (token) => {
  localStorage.setItem('accessToken', token)
}

export const getToken = () => {
  return localStorage.getItem('accessToken')
}

export const removeToken = () => {
  localStorage.removeItem('accessToken')
}

export const BASE_URL_API = BASE_URL