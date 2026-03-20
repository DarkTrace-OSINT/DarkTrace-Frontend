from flask import Flask, request, jsonify
from telegram_alert import send_telegram_alert
from slack_alert import send_slack_alert
from datetime import datetime

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "timestamp": datetime.now().isoformat()})

@app.route('/api/alert', methods=['POST'])
def receive_alert():
    """
    1번(Spring Boot)에서 호출하는 엔드포인트
    """
    data = request.get_json()

    if not data:
        return jsonify({"status": "error", "message": "데이터 없음"}), 400

    # 필수 필드 검증
    required = ["type", "severity", "source"]
    for field in required:
        if field not in data:
            return jsonify({"status": "error", "message": f"{field} 필드 없음"}), 400

    # 심각도에 따라 알림 발송
    severity = data.get("severity", "low")

    telegram_status = send_telegram_alert(data)
    slack_status = send_slack_alert(data)

    return jsonify({
        "status": "success",
        "timestamp": datetime.now().isoformat(),
        "alerts_sent": {
            "telegram": telegram_status == 200,
            "slack": slack_status == 200
        }
    }), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
