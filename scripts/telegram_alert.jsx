import axios from 'axios'

const TELEGRAM_TOKEN = import.meta.env.VITE_TELEGRAM_TOKEN
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

const severityEmoji = {
  high: '🔴',
  medium: '🟡',
  low: '🟢',
}

export const sendTelegramAlert = async (threatData) => {
  const emoji = severityEmoji[threatData.severity] || '⚪'
  const timestamp = threatData.timestamp || new Date().toISOString()

  const message = `
${emoji} <b>다크웹 위협 탐지 알림</b>

📌 <b>유형:</b> ${threatData.type || 'N/A'}
⚠️ <b>심각도:</b> ${(threatData.severity || 'N/A').toUpperCase()}
🌐 <b>출처:</b> ${threatData.source || 'N/A'}
🕐 <b>시각:</b> ${timestamp}
📧 <b>계정:</b> ${threatData.data?.id || 'N/A'}
`

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }
    )
    console.log('✅ 텔레그램 알림 발송 성공')
    return response.status
  } catch (error) {
    console.error('❌ 텔레그램 발송 실패:', error)
    return error.response?.status || 500
  }
}

export default sendTelegramAlert
