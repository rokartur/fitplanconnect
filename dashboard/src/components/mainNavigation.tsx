import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/utils.ts'

const links: { title: string; href: string }[] = [
	{ title: 'Overview', href: '/' },
	{ title: 'Users', href: '/users' },
	{ title: 'Products', href: '/products' },
	{ title: 'Settings', href: '/settings' },
]

export const MainNavigation = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
	<nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
		{links.map(({ title, href }) => (
			<Link key={href} to={href} className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
				{title}
			</Link>
		))}
	</nav>
)
