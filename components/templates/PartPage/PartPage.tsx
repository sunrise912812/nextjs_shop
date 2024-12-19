import cn from 'classnames'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/part/index.module.scss'
import { $boilerPart } from '@/context/boilerPart'
import { PartImageList } from '@/components/modules/PartPage/PartImageList'
import { formatPrice } from '@/utils/common'
import { $shopingCart } from '@/context/shopingCart'
import { useEffect, useState } from 'react'
import { CartHoverCheckedSVG } from '@/components/elements/CartHoverCheckedSVG/CartHoverCheckedSVG'
import { CartHoverSVG } from '@/components/elements/CartHoverSVG/CartHoverSVG'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { $user } from '@/context/user'
import { addToCartItemFx, removeFromCartFx } from '@/app/api/shoping-cart'
import { toast } from 'react-toastify'
import { updateShopingCart, removeShopingCartItem } from '@/context/shopingCart'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { PartTabs } from '@/components/modules/PartPage/PartTabs'
import { DashboardSlider } from '@/components/modules/DashboardPage/DashboardSlider'
import { getBoilerPartsFx } from '@/app/api/boilerParts'
import {
	$boilerParts,
	setBoilerParts,
	setBoilerPartsByPopularity,
} from '@/context/boilerParts'
import { PartAccordion } from '@/components/modules/PartPage/PartAccordion'

const PartPage = (): JSX.Element => {
	const mode = useUnit($mode)
	const user = useUnit($user)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const boilerPart = useUnit($boilerPart)
	const cartItems = useUnit($shopingCart)
	const isInCart = cartItems.some(
		(cartItem) => cartItem.partId === boilerPart.id
	)
	const [spinnerToggleCart, setSpinnerToggleCart] = useState<boolean>(false)
	const [spinnerSlider, setSpinnerSlider] = useState<boolean>(false)
	const attachRemoveShopingCartItem = useUnit(removeShopingCartItem)
	const attachUpdateShopingCart = useUnit(updateShopingCart)
	const isMobile = useMediaQuery(850)
	const attachSetBoilerParts = useUnit(setBoilerParts)
	const attachSetBoilerPartsByPopularity = useUnit(setBoilerPartsByPopularity)
	const boilerParts = useUnit($boilerParts)

	useEffect(() => {
		loadBoilerParts()
	}, [])

	const loadBoilerParts = async () => {
		try {
			setSpinnerSlider(true)
			const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')
			attachSetBoilerParts(data)
			attachSetBoilerPartsByPopularity()
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setTimeout(() => setSpinnerSlider(false), 1000)
		}
	}

	const toggleToCart = async () => {
		try {
			setSpinnerToggleCart(true)
			if (isInCart) {
				await removeFromCartFx(`/shopping-cart/one/${boilerPart.id}`)
				attachRemoveShopingCartItem(boilerPart.id)
				return
			}
			const data = await addToCartItemFx({
				url: '/shopping-cart/add',
				username: user.username,
				partId: boilerPart.id,
			})
			attachUpdateShopingCart(data)
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinnerToggleCart(false)
		}
	}

	return (
		<section>
			<div className="container">
				<div className={cn(styles.part__top, darkModeClass)}>
					<h2 className={cn(styles.part__title, darkModeClass)}>{boilerPart.name}</h2>
					<div className={styles.part__inner} style={{ overflow: 'hidden', width: 'auto' }}>
						<PartImageList />
						<div className={styles.part__info}>
							<span className={cn(styles.part__info__price, darkModeClass)}>
								{formatPrice(boilerPart.price || 0)} Тг
							</span>
							<span className={styles.part__info__stock}>
								{boilerPart.in_stock > 0 ? (
									<span className={styles.part__info__stock__success}>
										Есть на складе
									</span>
								) : (
									<span className={styles.part__info__stock__not}>
										Нет на складе
									</span>
								)}
							</span>
							<span className={styles.part__info__code}>
								Артикул: {boilerPart.vender_code}
							</span>
							<button
								className={cn(styles.part__info__btn, {
									[styles.in_cart]: isInCart === true,
								})}
								onClick={toggleToCart}
							>
								{spinnerToggleCart ? (
									<span
										className={spinnerStyles.spinner}
										style={{ top: 10, left: '45%' }}
									/>
								) : (
									<>
										<span className={styles.part__info__btn__icon}>
											{isInCart ? <CartHoverCheckedSVG /> : <CartHoverSVG />}
										</span>
										{isInCart ? (
											<span>Добавлено в корзину</span>
										) : (
											<span>Добавить в корзину</span>
										)}
									</>
								)}
							</button>
							{!isMobile && <PartTabs />}
						</div>
					</div>
				</div>
				{isMobile && (
					<div className={styles.part__accordion}>
						<div className={styles.part__accordion__inner}>
							<PartAccordion title="Описание">
								<div
									className={cn(styles.part__accordion__content, darkModeClass)}
								>
									<h3
										className={cn(
											styles.part__tabs__content__title,
											darkModeClass
										)}
									>
										{boilerPart.name}
									</h3>
									<p
										className={cn(
											styles.part__tabs__content__text,
											darkModeClass
										)}
									>
										{boilerPart.description}
									</p>
								</div>
							</PartAccordion>
						</div>
						<PartAccordion title="Совместимость">
							<div
								className={cn(styles.part__accordion__content, darkModeClass)}
							>
								<p
									className={cn(
										styles.part__tabs__content__text,
										darkModeClass
									)}
								>
									{boilerPart.compatibility}
								</p>
							</div>
						</PartAccordion>
					</div>
				)}
				<div className={styles.part__bottom}>
					<h2 className={cn(styles.part__title, darkModeClass)}>
						Вам понравится
					</h2>
					<DashboardSlider
						goToPartPage
						spinner={spinnerSlider}
						items={boilerParts.rows || []}
					/>
				</div>
			</div>
		</section>
	)
}

export default PartPage
