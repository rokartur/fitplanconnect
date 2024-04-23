import styles from './input.module.scss'
import { FC } from 'react'

type InputTypes = {
	title?: string
	supportingText?: JSX.Element
	icon?: JSX.Element
	placeholder?: string
	onChange?: (event: any) => void
	value?: string
	isBackground?: boolean
	isPreview?: boolean
}

export const Input: FC<InputTypes> = ({ title, supportingText, icon, placeholder, onChange, value, isBackground, isPreview = false }) => (
	<label className={`${styles.input}${isBackground ? ' ' + styles.inputBackground : ''}`}>
		{title ? <p>{title}</p> : null}
		{supportingText ? <p>{supportingText}</p> : null}
		{icon ? <span>{icon}</span> : null}
		{isPreview ? (
			<div className={`${styles.inputElement} ${icon ? styles.withIcon : styles.withOutIcon}`}>{value}</div>
		) : (
			<input
				className={`${styles.inputElement} ${icon ? styles.withIcon : styles.withOutIcon}`}
				type={'text'}
				placeholder={placeholder}
				onChange={onChange}
				spellCheck={false}
				value={value}
			/>
		)}
	</label>
)
