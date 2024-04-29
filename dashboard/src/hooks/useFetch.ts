import wretch from 'wretch'

const useFetch = (isCustom: boolean = false, url: string) => wretch(`${isCustom ? process.env.API_URL : ''}${url}`, { mode: 'cors' })

export default useFetch
