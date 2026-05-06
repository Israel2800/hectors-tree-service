# Hector's Tree Service

## Contact form delivery

The contact page is ready for:

- Required property address
- Simple lead intake flow against the shared backend platform
- Cloudflare Turnstile verification plus a honeypot field
- Delivery targeting the tenant inbox configured in the backend platform

To make the form send successfully in production, create a `.env` file with:

```bash
VITE_PLATFORM_API_BASE_URL=https://api.tree-services-platform.com
VITE_PLATFORM_API_PREFIX=v1
VITE_PLATFORM_TENANT_SLUG=hectors-tree-service
VITE_TURNSTILE_SITE_KEY=your-turnstile-site-key
```

Important:

- This frontend now submits a clean JSON lead request directly to the shared backend.
- The backend is responsible for validation, rate limiting, anti-bot verification, persistence, and email delivery.

## Responsive images

The project now generates optimized responsive image variants into `public/optimized-images`.

Use:

```bash
npm run images:generate
```

This command also runs automatically before `npm run build`.

Recommended production checklist:

- Configure the backend tenant with the correct notification inbox.
- Configure Cloudflare Turnstile hostnames for the production frontend domains.
- Validate and sanitize all fields on the server.
- Configure SPF, DKIM, and DMARC for the backend sending domain.
- Monitor SES delivery, worker failures, and lead submission logs during launch.
