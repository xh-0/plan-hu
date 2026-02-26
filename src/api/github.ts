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