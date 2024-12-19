import styles from '@/styles/part/index.module.scss'
import cn from 'classnames'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import { $boilerPart } from '@/context/boilerPart'
import { useState } from 'react'
import { motion } from 'framer-motion'

export const PartTabs = (): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const boilerPart = useUnit($boilerPart)
	const [showDescription, setShowDescription] = useState<boolean>(true)
	const [showCompatibility, setShowCompatibility] = useState<boolean>(false)

	const handleShowDecription = () => {
		setShowDescription(true)
		setShowCompatibility(false)
	}

	const handleShowCompatibility = () => {
		setShowCompatibility(true)
		setShowDescription(false)
	}

	return (
		<div className={styles.part__tabs}>
			<div className={cn(styles.part__tabs__controls, darkModeClass)}>
				<button
					className={cn({
						[styles.active]: showDescription === true,
					})}
					onClick={handleShowDecription}
				>
					Описание
				</button>
				<button
					className={cn({
						[styles.active]: showCompatibility === true,
					})}
					onClick={handleShowCompatibility}
				>
					Совместимость
				</button>
			</div>
			{showDescription && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={styles.part__tabs__content}
				>
					<h3 className={cn(styles.part__tabs__content__title, darkModeClass)}>
						{boilerPart.name}
					</h3>
					<p className={cn(styles.part__tabs__content__text, darkModeClass)}>
						{boilerPart.description}
					</p>
				</motion.div>
			)}
			{showCompatibility && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={styles.part__tabs__content}
				>
					<p className={cn(styles.part__tabs__content__text, darkModeClass)}>
						{boilerPart.compatibility}
					</p>
				</motion.div>
			)}
		</div>
	)
}
