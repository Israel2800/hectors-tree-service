import { useEffect, useRef, useState } from 'react'

const TURNSTILE_SCRIPT_ID = 'cf-turnstile-script'
let turnstileLoaderPromise

function loadTurnstileScript() {
  if (typeof window === 'undefined') {
    return Promise.resolve(null)
  }

  if (window.turnstile) {
    return Promise.resolve(window.turnstile)
  }

  if (!turnstileLoaderPromise) {
    turnstileLoaderPromise = new Promise((resolve, reject) => {
      const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID)

      if (existingScript) {
        existingScript.addEventListener('load', () => resolve(window.turnstile), { once: true })
        existingScript.addEventListener('error', reject, { once: true })
        return
      }

      const script = document.createElement('script')
      script.id = TURNSTILE_SCRIPT_ID
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.onload = () => resolve(window.turnstile)
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  return turnstileLoaderPromise
}

export default function TurnstileWidget({
  siteKey,
  onTokenChange,
  onError,
  resetSignal = 0,
}) {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)
  const onTokenChangeRef = useRef(onTokenChange)
  const onErrorRef = useRef(onError)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange
    onErrorRef.current = onError
  }, [onError, onTokenChange])

  useEffect(() => {
    if (!siteKey || !containerRef.current) {
      return undefined
    }

    let isMounted = true

    loadTurnstileScript()
      .then((turnstile) => {
        if (!isMounted || !turnstile || widgetIdRef.current !== null) {
          return
        }

        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: 'light',
          callback: (token) => {
            onTokenChangeRef.current?.(token)
            setIsReady(true)
          },
          'expired-callback': () => {
            onTokenChangeRef.current?.('')
          },
          'error-callback': () => {
            onTokenChangeRef.current?.('')
            onErrorRef.current?.('Turnstile verification could not be completed. Please try again.')
          },
        })

        setIsReady(true)
      })
      .catch(() => {
        if (isMounted) {
          onErrorRef.current?.('Turnstile could not load. Please refresh the page and try again.')
        }
      })

    return () => {
      isMounted = false

      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [siteKey])

  useEffect(() => {
    if (!isReady || !window.turnstile || widgetIdRef.current === null) {
      return
    }

    window.turnstile.reset(widgetIdRef.current)
  }, [isReady, resetSignal])

  return <div ref={containerRef} className="min-h-[65px]" />
}
