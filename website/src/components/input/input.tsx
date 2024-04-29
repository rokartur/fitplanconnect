import styles from './input.module.scss'
import { FC } from 'react'

type InputTypes = {
	title?: string
	placeholder?: string
	onChange?: (event: any) => void
	value?: string
}

export const Input: FC<InputTypes> = ({ title, placeholder, onChange, value }) => (
	<label className={styles.input}>
		{title ? <p>{title}</p> : null}
		<input
			type={'text'}
			placeholder={placeholder}
			onChange={onChange}
			spellCheck={false}
			value={value}
		/>
	</label>
)
