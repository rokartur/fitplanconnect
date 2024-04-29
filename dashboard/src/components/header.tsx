import { MainNavigation } from '@/components/mainNavigation.tsx'
import { UserNavigation } from '@/components/userNavigation.tsx'

export const Header = () => {
	return (
		<div className='border-b'>
			<div className='flex h-16 items-center px-4'>
				<MainNavigation className='mx-6' />
				<div className='ml-auto flex items-center space-x-4'>
					<UserNavigation />
				</div>
			</div>
		</div>
	)
}
