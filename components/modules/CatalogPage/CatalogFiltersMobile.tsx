import styles from '@/styles/catalog/index.module.scss'
import cn from 'classnames'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import { ICatalogFilterMobileProps } from '@/types/catalog'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { FiltersPopupTop } from './FiltersPopupTop'
import { FiltersPopup } from './FiltersPopup'
import {
	$boilerManufacturers,
	$partsManufacturers,
	setBoilerManufacturers,
	setPartsManufacturers,
	updateBoilerManufacturer,
	updatePartsManufacturer,
} from '@/context/boilerParts'
import { useState } from 'react'
import { Accordion } from '@/components/elements/Accordion/Accordion'
import { PriceRange } from './PriceRange'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export const CatalogFiltersMobile = ({
	spinner,
	applayFilters,
	resetFilterBtnDisabled,
	resetFilters,
	closePopup,
	filterMobileOpen,
	priceRange,
	setPriceRange,
	setIsPriceRangeChanged,
}: ICatalogFilterMobileProps): JSX.Element => {
	const isMobile = useMediaQuery(820)
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const boilerManufacturers = useUnit($boilerManufacturers)
	const partsManufacturers = useUnit($partsManufacturers)
	const attachUpdateBoilerManufacturer = useUnit(updateBoilerManufacturer)
	const attachSetBoilerManufacturers = useUnit(setBoilerManufacturers)
	const attachUpdatePartsManufacturer = useUnit(updatePartsManufacturer)
	const attachSetPartsManufacturers = useUnit(setPartsManufacturers)
	const [openBoilers, setOpenBoilers] = useState<boolean>(false)
	const [openParts, setOpenParts] = useState<boolean>(false)
	const handleOpenBoilers = () => setOpenBoilers(true)
	const handleCloseBoilers = () => setOpenBoilers(false)
	const handleOpenParts = () => setOpenParts(true)
	const handleCloseParts = () => setOpenParts(false)

	const isAnyBoilerManufacturerChecked = boilerManufacturers.some(
		(item) => item.checked
	)
	const isAnyPartsManufacturerChecked = partsManufacturers.some(
		(item) => item.checked
	)

	const resetAllBoilerManufacturers = () =>
		attachSetBoilerManufacturers(
			boilerManufacturers.map((item) => ({ ...item, checked: false }))
		)

	const resetAllPartsManufacturers = () =>
		attachSetPartsManufacturers(
			partsManufacturers.map((item) => ({ ...item, checked: false }))
		)

	const applayFiltersAndClosePopup = () => {
		applayFilters()
		closePopup()
	}

	return (
		<div
			className={cn(styles.catalog__bottom__filters, darkModeClass, {
				[styles.open]: filterMobileOpen,
			})}
		>
			<div className={styles.catalog__bottom__filters__inner}>
				<FiltersPopupTop
					resetBtnText="Сбросить всё"
					title="Фильтры"
					resetFilters={resetFilters}
					resetFilterBtnDisabled={resetFilterBtnDisabled}
					closePopup={closePopup}
				/>
				<div className={styles.filters__boiler_manufacturers}>
					<button
						className={cn(styles.filters__manufacturer__btn, darkModeClass)}
						onClick={handleOpenBoilers}
					>
						Производитель котлов
					</button>
					<FiltersPopup
						title="Производитель котлов"
						resetFilterBtnDisabled={!isAnyBoilerManufacturerChecked}
						handleClosePopup={handleCloseBoilers}
						updateManufacturer={attachUpdateBoilerManufacturer}
						setManufacturer={attachSetBoilerManufacturers}
						applayFilters={applayFiltersAndClosePopup}
						manufacturersList={boilerManufacturers}
						resetAllManufacturers={resetAllBoilerManufacturers}
						openPopup={openBoilers}
					/>
				</div>
				<div className={styles.filters__boiler_manufacturers}>
					<button
						className={cn(styles.filters__manufacturer__btn, darkModeClass)}
						onClick={handleOpenParts}
					>
						Производитель запчастей
					</button>
					<FiltersPopup
						title="Производитель запчастей"
						resetFilterBtnDisabled={!isAnyPartsManufacturerChecked}
						handleClosePopup={handleCloseParts}
						updateManufacturer={attachUpdatePartsManufacturer}
						setManufacturer={attachSetPartsManufacturers}
						applayFilters={applayFiltersAndClosePopup}
						manufacturersList={partsManufacturers}
						resetAllManufacturers={resetAllPartsManufacturers}
						openPopup={openParts}
					/>
				</div>
				<div className={styles.filters__price}>
					<Accordion
						title="Цена"
						titleClass={cn(styles.filters__manufacturer__btn, darkModeClass)}
						hideArrowClass={styles.hide_arrow}
						isMobileForFilters={isMobile}
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
			</div>
			<div className={styles.filters__actions}>
				<button
					className={styles.filters__actions__show}
					onClick={applayFiltersAndClosePopup}
					disabled={resetFilterBtnDisabled}
				>
					{spinner ? (
						<span
							className={spinnerStyles.spinner}
							style={{ top: 6, left: '47%' }}
						/>
					) : (
						'Показать'
					)}
				</button>
			</div>
		</div>
	)
}
