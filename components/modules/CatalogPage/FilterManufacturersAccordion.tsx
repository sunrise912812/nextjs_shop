import styles from '@/styles/catalog/index.module.scss'
import cn from 'classnames'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IFilterManufacturersAccordionProps } from '@/types/catalog'
import { Accordion } from '@/components/elements/Accordion/Accordion'
import { FilterCheckboxItem } from './FilterCheckboxItem'

export const FilterManufacturersAccordion = ({
	manufacturersList,
	title,
	setManufacturer,
	updateManufacturer,
}: IFilterManufacturersAccordionProps): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const isMobile = useMediaQuery(820)

	const chooseAllManufacturers = () =>
		setManufacturer(
			manufacturersList.map((item) => ({ ...item, checked: true }))
		)

	return (
		<Accordion
			title={title}
			titleClass={cn(styles.filters__manufacturer__btn, darkModeClass)}
			arrowOpenClass={styles.open}
			isMobileForFilters={isMobile}
			hideArrowClass={isMobile ? styles.hide_arrow : ''}
		>
			<div className={styles.filters__manufacturer__inner}>
				<button
					className={styles.filters__manufacturer__select_all}
					onClick={chooseAllManufacturers}
				>
					Выбрать все
				</button>
				<ul className={styles.filters__manufacturer__list}>
					{manufacturersList.map((item) => (
						<FilterCheckboxItem
							title={item.title}
							id={item.id}
							key={item.id}
							checked={item.checked}
							event={updateManufacturer}
						/>
					))}
				</ul>
				<div style={{ height: '24px' }} />
			</div>
		</Accordion>
	)
}
