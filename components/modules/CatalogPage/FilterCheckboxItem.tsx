import { IFilterCheckBoxItem } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'
import cn from 'classnames'
import { $mode } from '@/context/mode'
import { useUnit } from 'effector-react'

export const FilterCheckboxItem = ({
	title,
	checked,
	id,
	event,
}: IFilterCheckBoxItem): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

	const handleFilterChange = () =>
		event({ checked: !checked, id } as IFilterCheckBoxItem)

	return (
		<li className={cn(styles.filters__manufacturer__list__item, darkModeClass)}>
			<label>
				<input
					type="checkbox"
					checked={checked}
					onChange={handleFilterChange}
				/>
				<span>{title}</span>
			</label>
		</li>
	)
}
