import * as React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import cn from 'classnames'
import { IAccordion } from '@/types/common'

export const Accordion = ({
	children,
	title,
	titleClass,
	arrowOpenClass,
	isMobileForFilters,
	hideArrowClass,
	boxShadowStyle,
	callback,
}: IAccordion): JSX.Element => {
	const [expanded, setExpanded] = useState<boolean>(false)

	const toggleAccordion = () => {
		if (callback) {
			callback(expanded)
		}
		setExpanded(!expanded)
	}

	return (
		<>
			{title ? (
				isMobileForFilters ? (
					<button className={cn(titleClass, hideArrowClass)}>{title}</button>
				) : (
					<motion.button
						initial={false}
						onClick={toggleAccordion}
						className={cn(titleClass, {
							[arrowOpenClass]: expanded && !isMobileForFilters,
						})}
					>
						{title}
					</motion.button>
				)
			) : (
				''
			)}

			<AnimatePresence initial={false}>
				{(isMobileForFilters || expanded) && (
					<motion.div
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={{
							open: { opacity: 1, height: 'auto' },
							collapsed: { opacity: 0, height: 0 },
						}}
						style={{ overflow: 'hidden' }}
						transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
