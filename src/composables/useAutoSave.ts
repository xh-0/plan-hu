import { watch } from 'vue'

export const useAutoSave = (
  source: any,
  saveFn: () => Promise<void>,
  delay = 800
) => {
  let timer: any = null

  watch(
    source,
    () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        saveFn()
      }, delay)
    },
    { deep: true }
  )
}