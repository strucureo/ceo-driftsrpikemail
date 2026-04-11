# DriftSpike Email API - Complete Usage Guide

**Base URL:** `https://ceo-driftsrpikemail.vercel.app`

**Configured Email:** `ceo@strucureo.com`

**Plan Type:** Production (Unlimited emails, 30 requests/minute)

---

## 1. Health Check

Check if the API is running and healthy.

### Endpoint
```
GET /api/health
```

### Command
```bash
curl -s https://ceo-driftsrpikemail.vercel.app/api/health | jq .
```

### Response
```json
{
  "status": "healthy",
  "timestamp": "2026-04-11T14:04:23.863Z",
  "uptime": 136069,
  "config": {
    "status": "ok"
  },
  "metrics": {
    "totalRequests": 2,
    "totalErrors": 0,
    "avgResponseTime": "0ms",
    "errorRate": "0.00%"
  },
  "performance": {
    "responseTime": "0ms",
    "memoryUsage": {
      "rss": 59293696,
      "heapTotal": 11333632,
      "heapUsed": 7019472,
      "external": 2515744,
      "arrayBuffers": 16915
    },
    "nodeVersion": "v24.13.0"
  }
}
```

---

## 2. Send Email

Send an email via Microsoft 365 SMTP.

### Endpoint
```
POST /api/send-email
```

### Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "html": "<h1>Hello</h1><p>Email content here</p>",
  "attachments": []
}
```

### Command - Basic
```bash
curl -X POST https://ceo-driftsrpikemail.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "aathishpirate@gmail.com",
    "subject": "Test Email from DriftSpike",
    "html": "<h1>Hello!</h1><p>This is a test email from the DriftSpike API.</p><p>Sent from: ceo@strucureo.com</p>"
  }' | jq .
```

### Command - With Attachments (Base64)
```bash
curl -X POST https://ceo-driftsrpikemail.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "aathishpirate@gmail.com",
    "subject": "Email with Attachment",
    "html": "<h1>Important Document</h1><p>Please see the attached file.</p>",
    "attachments": [
      {
        "filename": "document.txt",
        "content": "VGhpcyBpcyBhIHRlc3QgZG9jdW1lbnQ=",
        "contentType": "text/plain",
        "encoding": "base64"
      }
    ]
  }' | jq .
```

### Success Response
```json
{
  "success": true,
  "message": "Email sent successfully",
  "user": {
    "id": "env-user",
    "email": "ceo@strucureo.com",
    "plan": "production"
  },
  "performance": {
    "responseTime": "1322ms"
  }
}
```

### Error Response
```json
{
  "error": "Email sending failed",
  "details": "Error message here",
  "performance": {
    "responseTime": "8763ms"
  }
}
```

---

## 3. Get Configuration

Retrieve the current API configuration (requires API Key).

### Endpoint
```
GET /api/get-config
```

### Headers
```
x-api-key: test-api-key-123
```

### Command
```bash
curl -s https://ceo-driftsrpikemail.vercel.app/api/get-config \
  -H "x-api-key: test-api-key-123" | jq .
```

### Response
```json
{
  "user": {
    "id": "env-user",
    "email": "ceo@strucureo.com",
    "plan_type": "production",
    "emails_sent_this_month": 1
  },
  "smtp_config": {
    "smtp_host": "smtp.office365.com",
    "smtp_port": 587,
    "smtp_secure": false,
    "smtp_user": "ceo@strucureo.com",
    "from_name": "Strucureo"
  },
  "imap_config": {
    "imap_host": "outlook.office365.com",
    "imap_port": 993,
    "imap_secure": true,
    "imap_user": "ceo@strucureo.com"
  },
  "limits": {
    "monthly_emails": "unlimited",
    "requests_per_minute": 30,
    "requests_per_hour": 1800
  },
  "performance": {
    "responseTime": "0ms"
  }
}
```

---

## 4. Get Metrics (Admin)

Get API metrics and performance data (requires Admin Key).

### Endpoint
```
GET /api/metrics
```

### Headers
```
x-admin-key: your-admin-key-here
```

### Command
```bash
curl -s https://ceo-driftsrpikemail.vercel.app/api/metrics \
  -H "x-admin-key: your-admin-key-here" | jq .
```

### Response
```json
{
  "timestamp": "2026-04-11T14:04:23.863Z",
  "mode": "env-config (local)",
  "user": {
    "email": "ceo@strucureo.com",
    "plan_type": "production",
    "smtp_configured": true,
    "imap_configured": true
  },
  "performance": {
    "uptime": 0.15559298,
    "memoryUsage": {
      "rss": 57954304,
      "heapTotal": 11595776,
      "heapUsed": 6643240,
      "external": 2528248,
      "arrayBuffers": 16915
    },
    "nodeVersion": "v24.13.0"
  }
}
```

---

## 5. Common Use Cases

### Send to Multiple Recipients (One at a Time)
```bash
# Send to recipient 1
curl -X POST https://ceo-driftsrpikemail.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user1@example.com",
    "subject": "Hello User 1",
    "html": "<p>Custom message for user 1</p>"
  }' | jq .

# Send to recipient 2
curl -X POST https://ceo-driftsrpikemail.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user2@example.com",
    "subject": "Hello User 2",
    "html": "<p>Custom message for user 2</p>"
  }' | jq .
```

### Send HTML Email with Formatting
```bash
curl -X POST https://ceo-driftsrpikemail.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "aathishpirate@gmail.com",
    "subject": "Professional Email",
    "html": "<html><body style=\"font-family: Arial, sans-serif; color: #333;\"><h1 style=\"color: #0078d4;\">Welcome to Strucureo</h1><p>This is a professionally formatted email.</p><ul><li>Feature 1</li><li>Feature 2</li><li>Feature 3</li></ul><p>Best regards,<br/>CEO Team</p></body></html>"
  }' | jq .
```

### Monitor API Health Continuously
```bash
# Check health every 30 seconds
while true; do
  echo "=== $(date) ==="
  curl -s https://ceo-driftsrpikemail.vercel.app/api/health | jq '.status, .metrics.avgResponseTime'
  sleep 30
done
```

### Send Test Email Batch
```bash
#!/bin/bash
# test-batch-emails.sh

RECIPIENTS=("aathishpirate@gmail.com" "test@example.com" "user@domain.com")

for email in "${RECIPIENTS[@]}"; do
  echo "Sending to: $email"
  curl -X POST https://ceo-driftsrpikemail.vercel.app/api/send-email \
    -H "Content-Type: application/json" \
    -d "{
      \"to\": \"$email\",
      \"subject\": \"Test Email - $(date)\",
      \"html\": \"<p>This is a batch test email sent at $(date)</p>\"
    }" | jq '.success, .performance.responseTime'
  sleep 1
done
```

---

## 6. Configuration Details

### Email Account
- **Email**: ceo@strucureo.com
- **Provider**: Microsoft 365
- **Status**: Authenticated with SMTP AUTH enabled

### SMTP Server
- **Host**: smtp.office365.com
- **Port**: 587
- **Security**: STARTTLS
- **Authentication**: Enabled

### IMAP Server
- **Host**: outlook.office365.com
- **Port**: 993
- **Security**: SSL/TLS
- **Authentication**: Enabled

### Rate Limits
- **Requests/Minute**: 30
- **Requests/Hour**: 1,800
- **Monthly Emails**: Unlimited (Production Plan)

---

## 7. Environment Variables (.env.local)

```env
# ===== API Security =====
API_KEY=test-api-key-123
ADMIN_KEY=your-admin-key-here

# ===== SMTP Configuration (Microsoft 365) =====
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ceo@strucureo.com
SMTP_PASS=Supra@10
FROM_NAME=Strucureo
FROM_EMAIL=ceo@strucureo.com

# ===== IMAP Configuration (Microsoft 365) =====
IMAP_HOST=outlook.office365.com
IMAP_PORT=993
IMAP_SECURE=true
IMAP_USER=ceo@strucureo.com
IMAP_PASS=Supra@10

# ===== Webhook Notifications (Auto-send new emails) =====
WEBHOOK_URL=https://ceo-driftsrpikemail.vercel.app/webhook/new-email
WEBHOOK_CHECK_INTERVAL=30

# Frontend app URL
FRONTEND_URL=https://ceo-driftsrpikemail.vercel.app/

PLAN_TYPE=production
PORT=3000
```

---

## 8. Troubleshooting

### Email Send Fails with Authentication Error
**Solution**: Ensure SMTP AUTH is enabled in Microsoft 365 Admin Center or use an App Password.

### Rate Limit Exceeded
**Error**: 429 Too Many Requests
**Solution**: Wait for the retry-after period or upgrade your plan.

### Invalid Request
**Error**: 400 Bad Request
**Solution**: Ensure the request body is valid JSON with required fields (to, subject, html).

### API Returns Service Unavailable
**Error**: 503 Service Unavailable
**Solution**: Check Vercel deployment status or API health endpoint.

---

## 9. Testing Commands Summary

```bash
# 1. Check health
curl -s https://ceo-driftsrpikemail.vercel.app/api/health | jq .

# 2. Get config
curl -s https://ceo-driftsrpikemail.vercel.app/api/get-config -H "x-api-key: test-api-key-123" | jq .

# 3. Get metrics
curl -s https://ceo-driftsrpikemail.vercel.app/api/metrics -H "x-admin-key: your-admin-key-here" | jq .

# 4. Send test email
curl -X POST https://ceo-driftsrpikemail.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"to":"aathishpirate@gmail.com","subject":"Test","html":"<p>Test email</p>"}' | jq .
```

---

**API Ready for Production** ✅
