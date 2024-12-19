import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import { motion } from 'framer-motion'
import cn from 'classnames'
import { useUnit } from 'effector-react'
import {
	IFilterCheckBoxItem,
	IManufacturersBlockItemProps,
} from '@/types/catalog'
import DeleteSvg from '@/components/elements/DeleteSVG/DeleteSVG'

export const ManufacturersBlockItem = ({
	item,
	event,
}: IManufacturersBlockItemProps): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

	const removeFilter = () =>
		event({ checked: !item.checked, id: item.id } as IFilterCheckBoxItem)

	return (
		<motion.li
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={cn(styles.manufacturers__list__item, darkModeClass)}
		>
			<span className={styles.manufacturers__list__item__text}>
				{item.title}
			</span>
			<button
				className={styles.manufacturers__list__item__btn}
				onClick={removeFilter}
			>
				<span>
					<DeleteSvg />
				</span>
			</button>
		</motion.li>
	)
}
