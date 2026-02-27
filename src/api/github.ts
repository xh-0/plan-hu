const OWNER = 'xh-0'
const REPO = 'plan-hu'

const BASE = `/api/github/repos/${OWNER}/${REPO}`

const headers = {
  Accept: 'application/vnd.github+json',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0'
}

export const request = async (url: string, options?: RequestInit) => {
  // 添加时间戳参数以绕过缓存
  const timestamp = new Date().getTime()
  const separator = url.includes('?') ? '&' : '?'
  const urlWithCacheBuster = `${url}${separator}t=${timestamp}`

  const res = await fetch(`${BASE}${urlWithCacheBuster}`, {
    headers,
    ...options
  })
  return res.json()
}