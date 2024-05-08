import { useScrollTop } from '@/hooks/useScrollTop'

export default function NotFound() {
	useScrollTop()
  
	return (
		<div>
			<h1>404</h1>
			<p>Page not found</p>
		</div>
	)
}
