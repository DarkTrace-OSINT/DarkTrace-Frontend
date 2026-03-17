import os
import requests
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

def send_telegram_alert(threat_data: dict):
    """
    1번(통합 서버)에서 호출하는 알림 함수
    threat_data 예시:
    {
        "type": "credential_leak",
        "severity": "high",
        "source": "breachforums",
        "data": {"id": "user@email.com", "pw": "****"},
        "timestamp": "2026-03-17T10:00:00"
    }
    """
    severity_emoji = {
        "high": "🔴",
        "medium": "🟡",
        "low": "🟢"
    }

    emoji = severity_emoji.get(threat_data.get("severity", "low"), "⚪")
    timestamp = threat_data.get("timestamp", datetime.now().isoformat())

    message = f"""
{emoji} <b>다크웹 위협 탐지 알림</b>

📌 <b>유형:</b> {threat_data.get('type', 'N/A')}
⚠️ <b>심각도:</b> {threat_data.get('severity', 'N/A').upper()}
🌐 <b>출처:</b> {threat_data.get('source', 'N/A')}
🕐 <b>시각:</b> {timestamp}
📧 <b>계정:</b> {threat_data.get('data', {}).get('id', 'N/A')}
"""

    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "HTML"
    }

    response = requests.post(url, json=payload)
    if response.status_code == 200:
        print("✅ 텔레그램 알림 발송 성공")
    else:
        print(f"❌ 발송 실패: {response.text}")

    return response.status_code


# 테스트 실행
if __name__ == "__main__":
    test_data = {
        "type": "credential_leak",
        "severity": "high",
        "source": "breachforums",
        "data": {"id": "test@example.com", "pw": "****"},
        "timestamp": datetime.now().isoformat()
    }
    send_telegram_alert(test_data)
