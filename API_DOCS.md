# OpenToWork Email API Documentation

Simple, fast email sending API powered by serverless SMTP on Vercel.

## Base URL

```
Production: https://opentoowork-email-api.vercel.app
```

---

## Authentication

All requests require an API key in the `x-api-key` header:

```bash
-H "x-api-key: test-api-key-123"
```

---

## Endpoints

### 1. Send Email

Send an email via SMTP.

**Endpoint:** `POST /api/send-email`

**Headers:**
```
x-api-key: YOUR_API_KEY
Content-Type: application/json
```

**Request Body:**
```json
{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "html": "<h1>HTML Content</h1><p>Your email body</p>",
  "attachments": [
    {
      "filename": "document.pdf",
      "content": "base64_encoded_content",
      "contentType": "application/pdf",
      "encoding": "base64"
    }
  ]
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "user": {
    "id": "env-user",
    "email": "your@email.com",
    "plan": "production"
  },
  "performance": {
    "responseTime": "1549ms"
  }
}
```

**Response (Error):**
```json
{
  "error": "Email sending failed",
  "details": "SMTP connection timeout",
  "performance": {
    "responseTime": "5000ms"
  }
}
```

**Example:**
```bash
curl -X POST https://opentoowork-email-api.vercel.app/api/send-email \
  -H "x-api-key: test-api-key-123" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "subject": "Hello World",
    "html": "<h1>Welcome!</h1><p>This is a test email.</p>"
  }'
```

---

### 2. Get Configuration

Retrieve API configuration and limits.

**Endpoint:** `GET /api/get-config`

**Headers:**
```
x-api-key: YOUR_API_KEY
```

**Response:**
```json
{
  "user": {
    "id": "env-user",
    "email": "your@email.com",
    "plan_type": "production"
  },
  "smtp_config": {
    "smtp_host": "akoneseo.com",
    "smtp_port": 587,
    "smtp_secure": false,
    "from_name": "OpenToWork Verify",
    "from_email": "verify@opentoowork.tech"
  },
  "limits": {
    "requests_per_minute": 30,
    "requests_per_hour": 1800,
    "plan_name": "Production"
  },
  "performance": {
    "responseTime": "12ms"
  }
}
```

**Example:**
```bash
curl -H "x-api-key: test-api-key-123" \
  https://opentoowork-email-api.vercel.app/api/get-config
```

---

### 3. Health Check

Check API health and status.

**Endpoint:** `GET /api/health`

**No authentication required**

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-03-25T16:47:42.460Z",
  "uptime": 63086,
  "config": {
    "status": "ok"
  },
  "metrics": {
    "totalRequests": 1,
    "totalErrors": 0,
    "avgResponseTime": "0ms",
    "errorRate": "0.00%"
  },
  "performance": {
    "responseTime": "0ms",
    "memoryUsage": {
      "rss": 57802752,
      "heapTotal": 11071488,
      "heapUsed": 6652744
    },
    "nodeVersion": "v24.13.0"
  }
}
```

**Example:**
```bash
curl https://opentoowork-email-api.vercel.app/api/health
```

---

### 4. Metrics (Admin)

Get detailed API metrics and analytics.

**Endpoint:** `GET /api/metrics`

**Headers:**
```
x-admin-key: YOUR_ADMIN_KEY
```

**Response:**
```json
{
  "timestamp": "2026-03-25T16:47:42.460Z",
  "emails": {
    "totalSent": 1000,
    "avgResponseTime": "1549ms",
    "successRate": "99.80%"
  },
  "performance": {
    "avgResponseTime": "156ms",
    "uptime": 3600,
    "memoryUsage": {
      "rss": 57802752,
      "heapTotal": 11071488,
      "heapUsed": 6652744
    },
    "nodeVersion": "v24.13.0"
  }
}
```

**Example:**
```bash
curl -H "x-admin-key: YOUR_ADMIN_KEY" \
  https://opentoowork-email-api.vercel.app/api/metrics
```

---

## Rate Limits

### Starter Plan (Free)
- **Requests:** 1 per minute
- **Monthly Emails:** 1,500
- **Concurrent Requests:** 1

### Production Plan
- **Requests:** 30 per minute
- **Monthly Emails:** Unlimited
- **Concurrent Requests:** 10

### Rate Limit Headers

Responses include rate limit information:
```
X-RateLimit-Limit: 30
X-RateLimit-Remaining: 29
X-RateLimit-Reset: 1707734460
```

### Rate Limit Exceeded Response
```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 60
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid API key |
| 408 | Request Timeout - Email sending timeout |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

---

## Code Examples

### JavaScript / Node.js

```javascript
const fetch = require('node-fetch');

async function sendEmail() {
  const response = await fetch('https://opentoowork-email-api.vercel.app/api/send-email', {
    method: 'POST',
    headers: {
      'x-api-key': 'test-api-key-123',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: 'user@example.com',
      subject: 'Hello from Node.js',
      html: '<h1>Welcome!</h1>'
    })
  });

  const data = await response.json();
  console.log(data);
}

sendEmail();
```

### Python

```python
import requests

response = requests.post(
    'https://opentoowork-email-api.vercel.app/api/send-email',
    headers={'x-api-key': 'test-api-key-123'},
    json={
        'to': 'user@example.com',
        'subject': 'Hello from Python',
        'html': '<h1>Welcome!</h1>'
    }
)

print(response.json())
```

### cURL

```bash
curl -X POST https://opentoowork-email-api.vercel.app/api/send-email \
  -H "x-api-key: test-api-key-123" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "subject": "Hello from cURL",
    "html": "<h1>Welcome!</h1>"
  }'
```

### PHP

```php
<?php
$ch = curl_init('https://opentoowork-email-api.vercel.app/api/send-email');

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'to' => 'user@example.com',
    'subject' => 'Hello from PHP',
    'html' => '<h1>Welcome!</h1>'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'x-api-key: test-api-key-123',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

print_r(json_decode($response));
?>
```

---

## Email Configuration

The API sends emails from:
- **From Name:** OpenToWork Verify
- **From Email:** verify@opentoowork.tech
- **SMTP Server:** akoneseo.com:587

---

## Best Practices

### 1. Error Handling

Always handle errors gracefully:

```javascript
try {
  const response = await fetch(url, options);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  
  return data;
} catch (error) {
  console.error('API Error:', error.message);
}
```

### 2. Rate Limiting

Implement exponential backoff for rate limit errors:

```javascript
async function sendWithRetry(data, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await sendEmail(data);
    } catch (error) {
      if (error.status === 429 && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
}
```

### 3. Security

- Never expose your API key in client-side code
- Use environment variables for API keys
- Implement server-side proxy for client requests
- Rotate API keys periodically

---

## Troubleshooting

### "Invalid API key"
→ Check your API key is correct: `test-api-key-123`

### "Rate limit exceeded"
→ Wait 1 minute (starter plan) or upgrade to production plan

### "Email sending failed"
→ Check SMTP configuration
→ Verify email format is valid
→ Check server logs for details

---

## Support

- Production URL: https://opentoowork-email-api.vercel.app
- Health Check: https://opentoowork-email-api.vercel.app/api/health
- GitHub: Contact your administrator

---

## Changelog

### v3.0.0 (2026-03-25)
- Migrated to serverless Vercel deployment
- Fixed TLS/SSL compatibility with legacy SMTP servers
- Added DNS resolution improvements
- Simplified to essential email sending only
- Removed database dependencies
- Environment-based configuration

### v2.0.0 (2026-02-12)
- Added Firebase support
- Enhanced rate limiting
- Better error handling

### v1.0.0 (2025-12-29)
- Initial release
- Email sending via SMTP
- Rate limiting
- Basic analytics
