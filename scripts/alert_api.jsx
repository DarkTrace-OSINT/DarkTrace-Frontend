import express from 'express'
import { sendTelegramAlert } from './telegram_alert.jsx'
import { sendSlackAlert } from './slack_alert.jsx'

const app = express()
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.post('/api/alert', async (req, res) => {
  const data = req.body

  if (!data) {
    return res.status(400).json({ status: 'error', message: '데이터 없음' })
  }

  const required = ['type', 'severity', 'source']
  for (const field of required) {
    if (!data[field]) {
      return res.status(400).json({ status: 'error', message: `${field} 필드 없음` })
    }
  }

  const telegramStatus = await sendTelegramAlert(data)
  const slackStatus = await sendSlackAlert(data)

  return res.status(200).json({
    status: 'success',
    timestamp: new Date().toISOString(),
    alerts_sent: {
      telegram: telegramStatus === 200,
      slack: slackStatus === 200,
    },
  })
})

app.listen(5001, () => {
  console.log('✅ Alert API 서버 실행 중 (port 5001)')
})

export default app
