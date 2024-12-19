import { $mode } from '@/context/mode'
import { useTheme } from '@/hooks/useTheme'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import styles from '@/styles/modeToggler/index.module.scss'
import { ModeTogglerProps } from './ModeToggler.props'

export const ModeToggler = ({ ...props }: ModeTogglerProps): JSX.Element => {
	const { toggleTheme } = useTheme()
	const mode = useUnit($mode)

	const handleToggleMode = () => {
		toggleTheme()
		document.body.classList.toggle('dark_mode') //Добавим класс
	}

	useEffect(() => {
		document.body.classList.add(mode === 'dark' ? 'dark_mode' : 'body')
	}, [mode])

	return (
		<div className={styles.theme} {...props}>
			<input
				className={styles.theme__input}
				type="checkbox"
				checked={mode === 'light'}
				onChange={handleToggleMode}
			/>
		</div>
	)
}
