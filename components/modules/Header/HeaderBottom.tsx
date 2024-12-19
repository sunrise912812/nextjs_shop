/* eslint-disable @next/next/no-img-element */
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/header/index.module.scss'
import cn from 'classnames'
import { HeaderBottomProps } from './HeaderBottom.props'
import Link from 'next/link'
import { SearchInput } from '@/components/elements/SearchInput/SearchInput'
import { ModeToggler } from '@/components/elements/ModeToggler/ModeToggler'
import CartPopup from './CartPopup'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { setDisableCart } from '@/context/shopingCart'

export const HeaderBottom = ({
	className,
	...props
}: HeaderBottomProps): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const isMedia950 = useMediaQuery(950)
	const router = useRouter()
	const attachSetDisableCart = useUnit(setDisableCart)

	useEffect(() => {
		if (router.pathname === '/order') {
			attachSetDisableCart(true)
			return
		}
		attachSetDisableCart(false)
	}, [router.pathname])

	return (
		<div className={cn(styles.header__bottom, className)} {...props}>
			<div className={cn('container', styles.header__bottom__container)}>
				<h1 className={styles.header__logo}>
					<Link
						href="/dashboard"
						className={styles.header__logo__link}
						passHref
					>
						<img src="/img/logo.svg" alt="logo" />
						<span
							className={cn(styles.header__logo__link__text, darkModeClass)}
						>
							Детали для газовых котлов
						</span>
					</Link>
				</h1>
				<div className={styles.header__search}>
					<SearchInput />
				</div>
				<div className={styles.header__shopping_cart}>
					{!isMedia950 && <ModeToggler />}
					<CartPopup />
				</div>
			</div>
		</div>
	)
}
