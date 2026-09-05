const apiUrl = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '')
const developmentUserId = import.meta.env.VITE_DEV_USER_ID as string | undefined

function requestHeaders(): Record<string, string> {
  if (!developmentUserId) throw new ApiError('The development user ID is not configured. Add VITE_DEV_USER_ID to the frontend environment.')
  return { 'X-User-ID': developmentUserId }
}

function apiEndpoint(path: string): string {
  if (!apiUrl) throw new ApiError('The API URL is not configured. Add VITE_API_URL to the frontend environment.')
  return `${apiUrl}${path}`
}

export class ApiError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function postJson<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
  let response: Response
  try {
    response = await fetch(apiEndpoint(path), {
      method: 'POST',
      headers: { ...requestHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new ApiError('We could not reach the analysis service. Check that the backend is running and try again.')
  }

  if (!response.ok) {
    let backendDetail = ''
    try {
      const errorBody = await response.json() as { detail?: string }
      backendDetail = typeof errorBody.detail === 'string' ? errorBody.detail : ''
    } catch {
      // Keep the friendly fallback below when the server returns non-JSON.
    }
    const message = response.status === 401
      ? 'The development identity was not accepted. Check the frontend API configuration.'
      : response.status === 422
        ? backendDetail || 'Some required information was missing or invalid. Review your inputs and try again.'
        : response.status === 503
          ? 'The AI analysis service is not configured yet.'
            : response.status === 502
            ? backendDetail || 'The AI analysis could not be completed. Please try again.'
            : 'The analysis service could not complete this request.'
    throw new ApiError(message, response.status)
  }

  return response.json() as Promise<TResponse>
}
