type PhotoTypes = {
	className?: string
	id?: string
	source: string
	width?: number
	height?: number
	isLazy?: boolean
}
const Photo = ({ className, id, source, width, height, isLazy = false }: PhotoTypes) => (
	<img
		className={className}
		id={id}
		src={source}
		width={width}
		height={height}
		loading={isLazy ? 'lazy' : 'eager'}
		alt={''}
	/>
)

export default Photo
