# Vercel Deployment Guide

## Quick Deploy

### 1. Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N** (first time) or **Y** (updating)
- Project name? **alexmainservice** (or your choice)
- Directory? **./** (press Enter)
- Override settings? **N**

### 4. Set Environment Variables

After deployment, add environment variables in Vercel Dashboard:

```bash
# Or use CLI
vercel env add API_KEY
vercel env add ADMIN_KEY
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_SECURE
vercel env add SMTP_USER
vercel env add SMTP_PASS
vercel env add FROM_NAME
vercel env add USER_EMAIL
vercel env add PLAN_TYPE
```

Or add them all at once in Vercel Dashboard:
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable from `.env.local`

### 5. Redeploy
```bash
vercel --prod
```

---

## Environment Variables for Vercel

Copy these from your `.env.local`:

```
API_KEY=test-api-key-123
ADMIN_KEY=your-admin-key-here
SMTP_HOST=akoneseo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=mailclass-cOjkaJYKva@client.opentoowork.com
SMTP_PASS=tooWork21
FROM_NAME=OpenToWork Verify
FROM_EMAIL=verify@opentoowork.tech
USER_EMAIL=alex@strucureo.com
PLAN_TYPE=production
```

**Optional (IMAP):**
```
IMAP_HOST=outlook.office365.com
IMAP_PORT=993
IMAP_SECURE=true
IMAP_USER=no-reply@strucureo.com
IMAP_PASS=Supra@10
```

**Optional (Webhook):**
```
WEBHOOK_URL=https://your-server.com/webhook/new-email
WEBHOOK_CHECK_INTERVAL=30
```

---

## Vercel Dashboard Method

1. Go to https://vercel.com
2. Click **Add New** → **Project**
3. Import your Git repository
4. Configure:
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** (leave empty)
   - **Install Command:** `npm install`
5. Add Environment Variables (see above)
6. Click **Deploy**

---

## Update Deployment

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## Test Your Deployment

```bash
curl -X POST https://alexmainservice.vercel.app/api/send-email \
  -H "x-api-key: test-api-key-123" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test Email",
    "html": "<h1>Hello!</h1>"
  }'
```

---

## Troubleshooting

### Environment Variables Not Working
- Make sure you added them in Vercel Dashboard
- Redeploy after adding variables: `vercel --prod`
- Check logs: `vercel logs`

### SMTP Errors
- Verify SMTP credentials are correct
- Check `SMTP_SECURE` matches your port (587=false, 465=true)
- Test locally first: `PORT=3001 npm run dev`

### API Not Responding
- Check deployment logs: `vercel logs`
- Verify `vercel.json` is correct
- Check function timeout (default 10s, max 60s on Pro)

---

## Vercel Configuration

Your `vercel.json` is already configured:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/health",
      "dest": "/api/health"
    },
    {
      "src": "/metrics",
      "dest": "/api/metrics"
    },
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ]
}
```

---

## Production URL

After deployment, your API will be available at:
```
https://alexmainservice.vercel.app
```

Or your custom domain if configured.

---

## Security Notes

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Rotate API keys** regularly
3. **Use strong passwords** for SMTP
4. **Enable rate limiting** (already configured)
5. **Monitor logs** for suspicious activity

---

## Next Steps

1. Deploy to Vercel
2. Test all endpoints
3. Update documentation with your production URL
4. Set up custom domain (optional)
5. Monitor usage and performance

