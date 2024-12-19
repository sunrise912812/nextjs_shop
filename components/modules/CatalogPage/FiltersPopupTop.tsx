import styles from '@/styles/catalog/index.module.scss'
import cn from 'classnames'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import { IFiltersPopupTop } from '@/types/catalog'

export const FiltersPopupTop = ({
	title,
	resetBtnText,
	resetFilters,
	resetFilterBtnDisabled,
	closePopup,
}: IFiltersPopupTop): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

	return (
		<div className={cn(styles.catalog__bottom__filters__top, darkModeClass)}>
			<button
				onClick={closePopup}
				className={cn(styles.catalog__bottom__filters__title, darkModeClass)}
			>
				{title}
			</button>
			<button
				onClick={resetFilters}
				disabled={resetFilterBtnDisabled}
				className={styles.catalog__bottom__filters__reset}
			>
				{resetBtnText}
			</button>
		</div>
	)
}
