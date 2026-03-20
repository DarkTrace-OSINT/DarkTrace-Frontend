import os
import requests
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

SLACK_WEBHOOK_URL = os.getenv("SLACK_WEBHOOK_URL")

def send_slack_alert(threat_data: dict):
    severity_color = {
        "high": "#FF0000",
        "medium": "#FFA500",
        "low": "#00FF00"
    }

    severity = threat_data.get("severity", "low")
    color = severity_color.get(severity, "#808080")
    timestamp = threat_data.get("timestamp", datetime.now().isoformat())

    payload = {
        "attachments": [
            {
                "color": color,
                "title": "🚨 다크웹 위협 탐지 알림",
                "fields": [
                    {"title": "유형", "value": threat_data.get("type", "N/A"), "short": True},
                    {"title": "심각도", "value": severity.upper(), "short": True},
                    {"title": "출처", "value": threat_data.get("source", "N/A"), "short": True},
                    {"title": "계정", "value": threat_data.get("data", {}).get("id", "N/A"), "short": True},
                    {"title": "탐지 시각", "value": timestamp, "short": False}
                ],
                "footer": "DarkWeb Alert System"
            }
        ]
    }

    response = requests.post(SLACK_WEBHOOK_URL, json=payload)
    if response.status_code == 200:
        print("✅ 슬랙 알림 발송 성공")
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
    send_slack_alert(test_data)
