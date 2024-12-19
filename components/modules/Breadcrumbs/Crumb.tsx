import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ICrumbProps } from '@/types/common'
import { CrumbArrowSVG } from '@/components/elements/CrumbArrowSVG/CrumbArrowSVG'
import styles from '@/styles/breadcrumbs/index.module.scss'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import cn from 'classnames'

export const Crumb = ({
	text: defaultText,
	textGenerator,
	href,
	last = false,
}: ICrumbProps) => {
	const [text, setText] = useState(defaultText)
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

	useEffect(() => {
		handleTextGenerate()
	}, [textGenerator])

	const handleTextGenerate = async () => {
		// If `textGenerator` is nonexistent, then don't do anything
		if (!Boolean(textGenerator)) {
			return
		}
		// Run the text generator and set the text again
		const finalText = await textGenerator()
		setText(finalText)
	}

	if (last) {
		return (
			<a>
				<span
					className={cn(styles.breadcrumbs__item__icon, darkModeClass)}
					style={{ marginRight: 13 }}
				>
					<CrumbArrowSVG />
				</span>
				<span className={cn('last-crumb', styles.breadcrumbs__item__text)}>
					{text}
				</span>
			</a>
		)
	}

	return (
		<Link href={href} passHref legacyBehavior>
			<a>
				<span
					className={cn(styles.breadcrumbs__item__icon, darkModeClass)}
					style={{ marginRight: 13 }}
				>
					<CrumbArrowSVG />
				</span>
				<span className={styles.breadcrumbs__item__text}>
					{text}
				</span>
			</a>
		</Link>
	)
}
