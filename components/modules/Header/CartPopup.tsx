import { ShopingCartSVG } from '@/components/elements/ShopingCartSVG/ShopingCartSVG'
import { IWrappedComponentProps } from '@/types/common'
import { forwardRef, useEffect } from 'react'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import { AnimatePresence, motion } from 'framer-motion'
import { WithClickOutside } from '@/utils/WithClickOutside'
import styles from '@/styles/cartPopup/index.module.scss'
import cn from 'classnames'
import {
	$disableCart,
	$shopingCart,
	$totalPrice,
	setShopingCart,
	setTotalPrice,
} from '@/context/shopingCart'
import Link from 'next/link'
import { CartPopupItem } from './CartPopupItem'
import { getCartItemsFx } from '@/app/api/shoping-cart'
import { $user } from '@/context/user'
import { toast } from 'react-toastify'
import { formatPrice } from '@/utils/common'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
	({ open, setOpen }, ref) => {
		const mode = useUnit($mode)
		const user = useUnit($user)
		const shopingCart = useUnit($shopingCart)
		const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
		const attachSetShopingCart = useUnit(setShopingCart)
		const attachSetTotalPrice = useUnit(setTotalPrice)
		const attachTotalPrice = useUnit($totalPrice)
		const disableCart = useUnit($disableCart)

		const togleCartDropDown = () => setOpen(!open)

		useEffect(() => {
			loadCartItems()
		}, [])

		useEffect(() => {
			if (shopingCart.length) {
				attachSetTotalPrice(
					shopingCart.reduce(
						(defaultCount, item) => defaultCount + item.total_price,
						0
					)
				)
			}
		}, [shopingCart])

		const loadCartItems = async () => {
			try {
				const cartItems = await getCartItemsFx(`/shopping-cart/${user.userId}`)
				attachSetShopingCart(cartItems)
			} catch (error) {
				toast.error((error as Error).message)
			}
		}

		return (
			<div className={styles.cart} ref={ref}>
				{disableCart ? (
					<button
						className={cn(styles.cart__btn, darkModeClass)}
						style={{ cursor: 'auto' }}
					>
						<span className={styles.cart__svg}>
							<ShopingCartSVG />
						</span>
						<span className={styles.cart__text}>Корзина</span>
					</button>
				) : (
					<button
						className={cn(styles.cart__btn, darkModeClass)}
						onClick={togleCartDropDown}
					>
						{!!shopingCart.length && (
							<span className={styles.cart__btn__count}>
								{shopingCart.length}
							</span>
						)}
						<span className={styles.cart__svg}>
							<ShopingCartSVG />
						</span>
						<span className={styles.cart__text}>Корзина</span>
					</button>
				)}
				<AnimatePresence>
					{open && (
						<motion.ul
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							className={cn(styles.cart__popup, darkModeClass)}
							style={{ transformOrigin: 'right top' }} //Укажем откуда будет начинаться анимация
						>
							<h3 className={styles.cart__popup__title}>Корзина</h3>
							<ul className={styles.cart__popup__list}>
								{shopingCart.length ? (
									shopingCart.map((item) => (
										<CartPopupItem key={item.id} item={item} />
									))
								) : (
									<li className={styles.cart_popup_empty}>
										<span
											className={cn(
												styles.cart_popup_empty__text,
												darkModeClass
											)}
										>
											Корзина пуста
										</span>
									</li>
								)}
							</ul>
							<div className={styles.cart__popup__footer}>
								<div className={styles.cart__popup__footer__total}>
									<span
										className={cn(
											styles.cart__popup__footer__text,
											darkModeClass
										)}
									>
										Общая сумма заказа:
									</span>
									<span className={styles.cart__popup__footer__price}>
										{formatPrice(attachTotalPrice)} Тг
									</span>
								</div>
								<Link href="/order" passHref>
									<button
										className={styles.cart__popup__footer__btn}
										disabled={!shopingCart.length}
									>
										Оформить заказ
									</button>
								</Link>
							</div>
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
		)
	}
)

CartPopup.displayName = 'CartPopup'

export default WithClickOutside(CartPopup)
