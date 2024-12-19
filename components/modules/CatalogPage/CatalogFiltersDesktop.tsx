import styles from '@/styles/catalog/index.module.scss'
import cn from 'classnames'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import {
	$boilerManufacturers,
	$partsManufacturers,
	setBoilerManufacturers,
	setPartsManufacturers,
	updateBoilerManufacturer,
	updatePartsManufacturer,
} from '@/context/boilerParts'
import { FilterManufacturersAccordion } from './FilterManufacturersAccordion'
import { Accordion } from '@/components/elements/Accordion/Accordion'
import { PriceRange } from './PriceRange'
import { ICatalogFilterDesktopProps } from '@/types/catalog'
import spinnerStyles from '@/styles/spinner/index.module.scss'

export const CatalogFiltersDesktop = ({
	priceRange,
	setPriceRange,
	setIsPriceRangeChanged,
	resetFilterBtnDisabled,
	spinner,
	resetFilters,
	applayFilters,
}: ICatalogFilterDesktopProps): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const boilerManufacturers = useUnit($boilerManufacturers)
	const partsManufacturers = useUnit($partsManufacturers)
	const attachUpdateBoilerManufacturer = useUnit(updateBoilerManufacturer)
	const attachSetBoilerManufacturers = useUnit(setBoilerManufacturers)
	const attachUpdatePartsManufacturer = useUnit(updatePartsManufacturer)
	const attachSetPartsManufacturers = useUnit(setPartsManufacturers)

	return (
		<div className={cn(styles.catalog__bottom__filters, darkModeClass)}>
			<h3 className={cn(styles.catalog__bottom__filters__title, darkModeClass)}>
				Фильтры
			</h3>
			<div className={styles.filters__boiler__manufacturers}>
				<FilterManufacturersAccordion
					manufacturersList={boilerManufacturers}
					title="Производитель котлов"
					updateManufacturer={attachUpdateBoilerManufacturer}
					setManufacturer={attachSetBoilerManufacturers}
				/>
			</div>
			<div className={styles.filters__price}>
				<Accordion
					title="Цена"
					titleClass={cn(styles.filters__manufacturer__btn, darkModeClass)}
					arrowOpenClass={styles.open}
				>
					<div className={styles.filters__manufacturer__inner}>
						<PriceRange
							priceRange={priceRange}
							setPriceRange={setPriceRange}
							setIsPriceRangeChanged={setIsPriceRangeChanged}
						/>
						<div style={{ height: '24px' }} />
					</div>
				</Accordion>
			</div>
			<div className={styles.filters__boiler__manufacturers}>
				<FilterManufacturersAccordion
					manufacturersList={partsManufacturers}
					title="Производитель запчастей"
					updateManufacturer={attachUpdatePartsManufacturer}
					setManufacturer={attachSetPartsManufacturers}
				/>
			</div>
			<div className={styles.filters__actions}>
				<button
					className={styles.filters__actions__show}
					disabled={spinner || resetFilterBtnDisabled}
					onClick={applayFilters}
				>
					{spinner ? <span className={spinnerStyles.spinner} style={{ top: 6, left: '47%' }} /> : 'Показать'}
				</button>
				<button className={styles.filters__actions__reset} disabled={resetFilterBtnDisabled} onClick={resetFilters}>Сбросить</button>
			</div>
		</div>
	)
}
