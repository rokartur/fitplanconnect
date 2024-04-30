import wretch from 'wretch'
import useSWR from 'swr'

const fetcher = (args: any) => wretch(args).get().json().then()

export const useFetch = (url: string) => {
	const { data, error, isLoading } = useSWR(url, fetcher, { revalidateOnFocus: false })
	return { data, error, isLoading }
}
