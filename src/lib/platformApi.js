const platformApiBaseUrl = (import.meta.env.VITE_PLATFORM_API_BASE_URL || '').replace(/\/$/, '')
const platformApiPrefix = (import.meta.env.VITE_PLATFORM_API_PREFIX || 'v1').replace(/^\/+|\/+$/g, '')

function requireBaseUrl() {
  if (!platformApiBaseUrl) {
    throw new Error('The platform API base URL is not configured.')
  }
}

function buildPlatformUrl(pathname) {
  requireBaseUrl()
  const normalizedPath = pathname.replace(/^\/+/, '')
  return `${platformApiBaseUrl}/${platformApiPrefix}/${normalizedPath}`
}

async function postJson(pathname, payload) {
  const response = await fetch(buildPlatformUrl(pathname), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

export function isPlatformConfigured() {
  return Boolean(platformApiBaseUrl)
}

export function getPlatformConfig() {
  return {
    apiBaseUrl: platformApiBaseUrl,
    apiPrefix: platformApiPrefix,
    tenantSlug: import.meta.env.VITE_PLATFORM_TENANT_SLUG || '',
    turnstileSiteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY || '',
  }
}

export function submitLead(payload) {
  return postJson('public/leads', payload)
}
