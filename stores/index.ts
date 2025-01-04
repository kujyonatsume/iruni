export const useDark = defineStore('dark', () => {
    const dark = ref(false)
    return { dark, change: () => localStorage.setItem('dark', String(dark.value = !dark.value)) }
})