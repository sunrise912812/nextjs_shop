import styles from '@/styles/catalog/index.module.scss'
import cn from 'classnames'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import { IFilterPopupProps } from '@/types/catalog'
import { FiltersPopupTop } from './FiltersPopupTop'
import { FilterManufacturersAccordion } from './FilterManufacturersAccordion'

export const FiltersPopup = ({
	resetFilterBtnDisabled,
	resetAllManufacturers,
	handleClosePopup,
	updateManufacturer,
	setManufacturer,
	applayFilters,
	openPopup,
	title,
	manufacturersList,
}: IFilterPopupProps): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	return (
		<div
			className={cn(styles.filters__popup, darkModeClass, {
				[styles.open]: openPopup,
			})}
		>
			<div className={styles.filters__popup__inner}>
				<FiltersPopupTop
					resetBtnText="Сбросить"
					title={title as string}
					resetFilterBtnDisabled={resetFilterBtnDisabled}
					resetFilters={resetAllManufacturers}
					closePopup={handleClosePopup}
				/>
				<FilterManufacturersAccordion
					manufacturersList={manufacturersList}
					title={false}
					updateManufacturer={updateManufacturer}
					setManufacturer={setManufacturer}
				/>
				<div className={styles.filters__actions}>
					<button
						className={styles.filters__actions__show}
						disabled={resetFilterBtnDisabled}
						onClick={applayFilters}
						style={{ marginBottom: 12 }}
					>
						Показать
					</button>
					<button
						className={styles.filters__actions__reset}
						onClick={handleClosePopup}
					>
						Назад
					</button>
				</div>
			</div>

		</div>
	)
}
