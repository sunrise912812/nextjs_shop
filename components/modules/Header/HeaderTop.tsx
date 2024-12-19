import { HeaderTopProps } from './HeaderTop.props'
import cn from 'classnames'
import Link from 'next/link'
import { CityButton } from '@/components/elements/CityButton/CityButton'
import ProfileDropDown from './ProfileDropDown'
import styles from '@/styles/header/index.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ModeToggler } from '@/components/elements/ModeToggler/ModeToggler'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import { usePopup } from '@/hooks/usePopup'

export const HeaderTop = ({
	className,
	...props
}: HeaderTopProps): JSX.Element => {
	const isMedia950 = useMediaQuery(950)
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const { togleOpen, open, closePopup } = usePopup()

	return (
		<div className={cn(styles.header__top, className)} {...props}>
			<div className={cn('container', styles.header__top__container)}>
				{!isMedia950 && <CityButton />}
				{isMedia950 && (
					<button
						onClick={togleOpen}
						className={cn(styles.burger_menu, darkModeClass, {
							[styles.open]: open,
						})}
					>
						<span />
						<span />
						<span />
					</button>
				)}
				<nav
					className={cn(styles.header__nav, darkModeClass, {
						[styles.open]: open,
					})}
				>
					<ul className={styles.header__nav__list}>
						<li className={styles.header__nav__list__item}>
							<Link
								href="/shipping-payment"
								passHref
								className={cn(styles.header__nav__list__item__link, darkModeClass)}
								onClick={closePopup}
							>
								Доставка и оплата
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link
								href="/about"
								className={cn(styles.header__nav__list__item__link, darkModeClass)}
								passHref
								onClick={closePopup}
							>
								О компании
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link
								href="/catalog"
								className={cn(styles.header__nav__list__item__link, darkModeClass)}
								passHref
								onClick={closePopup}
							>
								Каталог
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link
								href="/contacts"
								className={cn(styles.header__nav__list__item__link, darkModeClass)}
								passHref
								onClick={closePopup}
							>
								Контакты
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link
								href="/wholesale-buyers"
								className={cn(styles.header__nav__list__item__link, darkModeClass)}
								passHref
								onClick={closePopup}
							>
								Оптовым покупателям
							</Link>
						</li>
						{isMedia950 && (
							<li className={styles.header__nav__list__item}>
								<CityButton />
							</li>
						)}
						{isMedia950 && (
							<li className={styles.header__nav__list__item}>
								<ModeToggler />
							</li>
						)}
					</ul>
				</nav>
				<ProfileDropDown />
			</div>
		</div>
	)
}
