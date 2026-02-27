const OWNER = 'xh-0'
const REPO = 'plan-hu'
const TOKEN = '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'

const BASE = `https://api.github.com/repos/${OWNER}/${REPO}`

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json'
}

export const request = async (url: string, options?: RequestInit) => {
  const res = await fetch(`${BASE}${url}`, {
    headers,
    ...options
  })
  return res.json()
}