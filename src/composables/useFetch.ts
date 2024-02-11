import { ref, type Ref } from 'vue'

interface UseFetch<T> {
  data: Ref<T | any>
  loading: Ref<boolean>
  fetchData: () => void
}

export function useFetch<T>(
  promise: () => Promise<any>,
  transformer: (params: any) => T,
  initialState: any = null
): UseFetch<T> {
  const data = ref<Ref<T> | typeof initialState>(initialState)
  const loading = ref(false)

  const fetchData = async () => {
    loading.value = true
    const users = await promise()
    data.value = transformer(users)
    loading.value = false
  }

  return { data, loading, fetchData }
}
