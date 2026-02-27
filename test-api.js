const OWNER = 'xh-0'
const REPO = 'plan-hu'
const TOKEN = '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'

const BASE = `https://api.github.com/repos/${OWNER}/${REPO}`

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0'
}

const request = async (url, options) => {
  try {
    // 添加时间戳参数以绕过缓存
    const timestamp = new Date().getTime()
    const separator = url.includes('?') ? '&' : '?'
    const urlWithCacheBuster = `${url}${separator}t=${timestamp}`

    console.log('Request URL:', `${BASE}${urlWithCacheBuster}`)

    const res = await fetch(`${BASE}${urlWithCacheBuster}`, {
      headers,
      ...options
    })
    console.log('Status:', res.status)
    console.log('Status Text:', res.statusText)
    const data = await res.json()
    console.log('Response:', data)
    return data
  } catch (error) {
    console.error('Error:', error)
  }
}

// 测试获取 issues 列表
request('/issues?state=open&per_page=100')
