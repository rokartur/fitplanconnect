import { FC } from 'react'

type ImageProps = {
	className?: string;
	id?: string;
	source: string;
	width?: string | number;
	height?: string | number;
}

export const Image: FC<ImageProps> = ({ className, id, source, width, height }) => (
	<img
		className={className}
		id={id}
		src={source}
		width={width}
		height={height}
		loading={'lazy'}
		alt={''}
	/>
)
