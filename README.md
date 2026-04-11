# Alex Email API

Simple, fast email sending API powered by environment-based SMTP configuration. Perfect for serverless deployment on Vercel.

## Features

✅ Send emails via SMTP  
✅ Custom from address support  
✅ Email attachments (base64)  
✅ Rate limiting (1 req/min starter, 30 req/min production)  
✅ API key authentication  
✅ Health monitoring  
✅ Performance metrics  
✅ Serverless-ready (Vercel)  

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd api.driftspike
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` and update:

```bash
API_KEY=your-api-key-here
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
FROM_NAME=Your Name
FROM_EMAIL=noreply@yourdomain.com
```

### 3. Deploy to Vercel

```bash
vercel
```

Add environment variables in Vercel Dashboard, then:

```bash
vercel --prod
```

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

## API Endpoints

### Send Email
```bash
POST /api/send-email
Headers: x-api-key: YOUR_API_KEY
Body: {
  "to": "recipient@example.com",
  "subject": "Hello",
  "html": "<h1>Hello World</h1>"
}
```

### Get Configuration
```bash
GET /api/get-config
Headers: x-api-key: YOUR_API_KEY
```

### Health Check
```bash
GET /api/health
```

### Metrics (Admin)
```bash
GET /api/metrics
Headers: x-admin-key: YOUR_ADMIN_KEY
```

## Example Usage

```bash
curl -X POST https://alexmainservice.vercel.app/api/send-email \
  -H "x-api-key: test-api-key-123" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "subject": "Test Email",
    "html": "<h1>Hello!</h1><p>This is a test.</p>"
  }'
```

## Rate Limits

- **Starter Plan**: 1 request/minute, 1,500 emails/month
- **Production Plan**: 30 requests/minute, unlimited emails

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `API_KEY` | Yes | API authentication key |
| `ADMIN_KEY` | No | Admin metrics access |
| `SMTP_HOST` | Yes | SMTP server hostname |
| `SMTP_PORT` | Yes | SMTP port (587 or 465) |
| `SMTP_SECURE` | Yes | Use SSL (false for 587, true for 465) |
| `SMTP_USER` | Yes | SMTP username |
| `SMTP_PASS` | Yes | SMTP password |
| `FROM_NAME` | Yes | Sender name |
| `FROM_EMAIL` | Yes | Sender email address |
| `USER_EMAIL` | No | User identifier |
| `PLAN_TYPE` | No | starter or production |

## Project Structure

```
.
├── api/
│   ├── send-email.js      # Email sending endpoint
│   ├── get-config.js      # Configuration endpoint
│   ├── health.js          # Health check
│   └── metrics.js         # Admin metrics
├── lib/
│   ├── connection-manager.js  # SMTP connection pooling
│   ├── env-config.js          # Environment configuration
│   └── rate-limiter.js        # Rate limiting logic
├── .env.example           # Environment template
├── vercel.json           # Vercel configuration
└── package.json          # Dependencies
```

## Deployment

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete deployment guide.

## Security

- API key authentication required
- Rate limiting enabled
- Environment variables for credentials
- No credentials in code
- CORS enabled

## License

MIT
