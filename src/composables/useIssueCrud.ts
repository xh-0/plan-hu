import { request } from '../api/github'

export interface IssueItem {
  id: number
  title: string
  content: string
  created_at: string
}

export const useIssueCrud = () => {

  const getList = async () => {
    const data = await request('/issues?state=open&per_page=100')
    return data.map((i: any) => ({
      id: i.number,
      title: i.title,
      content: i.body || '',
      created_at: i.created_at
    }))
  }

  const createItem = async (title: string, content: string) => {
    return request('/issues', {
      method: 'POST',
      body: JSON.stringify({ title, body: content })
    })
  }

  const updateItem = async (id: number, title: string, content: string) => {
    return request(`/issues/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title, body: content })
    })
  }

  const deleteItem = async (id: number) => {
    return request(`/issues/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ state: 'closed' })
    })
  }

  return { getList, createItem, updateItem, deleteItem }
}