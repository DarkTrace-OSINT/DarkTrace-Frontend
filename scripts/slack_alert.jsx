import axios from 'axios'

const SLACK_WEBHOOK_URL = import.meta.env.VITE_SLACK_WEBHOOK_URL

const severityColor = {
  high: '#FF0000',
  medium: '#FFA500',
  low: '#00FF00',
}

export const sendSlackAlert = async (threatData) => {
  const severity = threatData.severity || 'low'
  const color = severityColor[severity] || '#808080'
  const timestamp = threatData.timestamp || new Date().toISOString()

  const payload = {
    attachments: [
      {
        color,
        title: '🚨 다크웹 위협 탐지 알림',
        fields: [
          { title: '유형', value: threatData.type || 'N/A', short: true },
          { title: '심각도', value: severity.toUpperCase(), short: true },
          { title: '출처', value: threatData.source || 'N/A', short: true },
          { title: '계정', value: threatData.data?.id || 'N/A', short: true },
          { title: '탐지 시각', value: timestamp, short: false },
        ],
        footer: 'DeepRadar Alert System',
      },
    ],
  }

  try {
    const response = await axios.post(SLACK_WEBHOOK_URL, payload)
    console.log('✅ 슬랙 알림 발송 성공')
    return response.status
  } catch (error) {
    console.error('❌ 슬랙 발송 실패:', error)
    return error.response?.status || 500
  }
}

export default sendSlackAlert
