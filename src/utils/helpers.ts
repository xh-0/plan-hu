export const searchList = (list: any[], keyword: string) => {
  return list.filter(i =>
    i.title.toLowerCase().includes(keyword.toLowerCase())
  )
}

export const sortByDate = (list: any[], asc = false) => {
  return [...list].sort((a, b) =>
    asc
      ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}

export const paginate = (list: any[], page: number, size: number) => {
  const start = (page - 1) * size
  return list.slice(start, start + size)
}