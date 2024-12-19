import styles from '@/styles/part/index.module.scss'
import cn from 'classnames'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import { Accordion } from '@/components/elements/Accordion/Accordion'
import { IPartAccordionProps } from '@/types/part'

export const PartAccordion = ({
	children,
	title,
}: IPartAccordionProps): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

	const handleExpandAccordion = (expanded: boolean) => {
		const accordionTitles = document.querySelectorAll(
			`.${styles.part__accordion__title}`
		)
		accordionTitles.forEach((title) => {
			const item = title as HTMLElement
			if (!expanded) {
				item.style.borderBottomLeftRadius = '0'
				item.style.borderBottomRightRadius = '0'
			}
			else {
				item.style.borderBottomLeftRadius = '4px'
				item.style.borderBottomRightRadius = '4px'
			}
		})
	}

	return (
		<Accordion
			title={title}
			titleClass={cn(styles.part__accordion__title, darkModeClass)}
			arrowOpenClass={styles.open}
			boxShadowStyle="0px 2px 8px rgba(0, 0, 0, 0.1)"
			callback={handleExpandAccordion}
		>
			{children}
		</Accordion>
	)
}
