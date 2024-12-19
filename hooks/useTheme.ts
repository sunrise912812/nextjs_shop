import { useUnit } from 'effector-react'
import { $mode, setMode } from '@/context/mode'
import { useEffect } from 'react'

export const useTheme = () => {
	const mode = useUnit($mode)
	const attachMode = useUnit(setMode)

	const toggleTheme = () => {
		if (mode === 'dark') {
			localStorage.setItem('mode', JSON.stringify('light'))
			attachMode('light')
		} else {
			localStorage.setItem('mode', JSON.stringify('dark'))
			attachMode('dark')
		}
	}

	useEffect(() => {
		const localTheme = JSON.parse(localStorage.getItem('mode') as string)

		if (localTheme) {
			attachMode(localTheme)
		}
	}, [])

	return { toggleTheme }
}
