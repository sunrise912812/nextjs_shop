/* eslint-disable @next/next/no-img-element */
import { IShopingCartItem } from '@/types/shopingCart'
import styles from '@/styles/cartPopup/index.module.scss'
import cn from 'classnames'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import Link from 'next/link'
import DeleteSvg from '@/components/elements/DeleteSVG/DeleteSVG'
import { useEffect, useState } from 'react'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { formatPrice } from '@/utils/common'
import { removeShopingCartItem } from '@/context/shopingCart'
import { toast } from 'react-toastify'
import { removeFromCartFx } from '@/app/api/shoping-cart'
import { updateCartItemFx } from '@/app/api/shoping-cart'
import { updateCartItemTotalPrice } from '@/context/shopingCart'
import { CartItemCounter } from '@/components/elements/CartItemCounter/CartItemCounter'

export const CartPopupItem = ({
	item,
}: {
	item: IShopingCartItem
}): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const spinnerDarkModeClass =
		mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`
	const [spinner, setSpinner] = useState<boolean>(false)
	const [price, setPrice] = useState<number>(item.price)
	const attachRemoveShopingCartItem = useUnit(removeShopingCartItem)
	const attachUpdateCartItemTotalPrice = useUnit(updateCartItemTotalPrice)

	const increasePrice = () => {
		setPrice(price + item.price)
	}
	const decrasePrice = () => {
		setPrice(price - item.price)
	}

	useEffect(() => {
		setPrice(price * item.count)
	}, [])

	const removeItemFromCart = async () => {
		try {
			setSpinner(true)
			await removeFromCartFx(`/shopping-cart/one/${item.partId}`)
			attachRemoveShopingCartItem(item.partId)
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}

	return (
		<li className={styles.cart__popup__list__item}>
			<div className={styles.cart__popup__list__item__top}>
				<div className={styles.cart__popup__list__item__img}>
					{/*<img src={item.image} alt={item.name} />*/}
					<img src="/img/manufactures.jpg" alt={item.name} />
				</div>
				<Link
					href={`/catalog/${item.partId}`}
					passHref
					className={cn(styles.cart__popup__list__item__text, darkModeClass)}
				>
					<span>
						{item.name.replace('.', '')},{item.parts_manufacturer},
						{item.boiler_manufacturer}
					</span>
				</Link>
				<button onClick={removeItemFromCart}>
					<span>
						{spinner ? (
							<span
								className={cn(spinnerStyles.spinner, spinnerDarkModeClass)}
								style={{ top: 0, left: 0, width: 20, height: 20 }}
							/>
						) : (
							<DeleteSvg />
						)}
					</span>
				</button>
			</div>
			<div className={styles.cart__popup__list__item__bottom}>
				{item.in_stock === 0 ? (
					<span className={styles.cart__popup__list__item__empty}>
						Нет на складе
					</span>
				) : (
					<CartItemCounter
						totalCount={item.in_stock}
						partId={item.partId}
						initialCount={item.count}
						increasePrice={increasePrice}
						decrasePrice={decrasePrice}
						priceOne={item.price}
					/>
				)}
				<span
					className={cn(styles.cart__popup__list__item__price, darkModeClass)}
				>
					{formatPrice(price)} Тг
				</span>
			</div>
		</li>
	)
}
