export const useDark = defineStore('dark', () => {
    const data = ref(false)
    return { data, change: () => localStorage.setItem('dark', String(data.value = !data.value)) }
})
export const useTitle = defineStore('title', () => {
    const data = ref("")
    return { data, set: (text: string) => data.value = text }
})