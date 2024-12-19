import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import cn from 'classnames'
import { IManufacturersBlockProps } from '@/types/catalog'
import { ManufacturersBlockItem } from './ManufacturersBlockItem'

export const ManufacturersBlock = ({
	title,
	manufacturersList,
	event,
}: IManufacturersBlockProps): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const checkedItems = manufacturersList.filter((item) => item.checked === true)

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={cn(styles.manufacturers, darkModeClass)}
		>
			<h3 className={cn(styles.manufacturers__title, darkModeClass)}>
				{title}
			</h3>
			<ul className={styles.manufacturers__list}>
				<AnimatePresence>
					{checkedItems.map((item) => (

						<ManufacturersBlockItem key={item.id} item={item} event={event} />

					))}
				</AnimatePresence>
			</ul>
		</motion.div>
	)
}
