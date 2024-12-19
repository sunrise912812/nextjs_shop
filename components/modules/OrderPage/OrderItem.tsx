/* eslint-disable @next/next/no-img-element */
import { IShopingCartItem } from '@/types/shopingCart'
import styles from '@/styles/order/index.module.scss'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { updateCartItemTotalPrice } from '@/context/shopingCart'
import { updateCartItemFx } from '@/app/api/shoping-cart'
import { removeFromCartFx } from '@/app/api/shoping-cart'
import { removeShopingCartItem } from '@/context/shopingCart'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { CartItemCounter } from '@/components/elements/CartItemCounter/CartItemCounter'
import { formatPrice } from '@/utils/common'
import spinnerStyles from '@/styles/spinner/index.module.scss'

export const OrderItem = ({
	item,
}: {
	item: IShopingCartItem
}): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const spinnerDarkModeClass =
		mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`
	const isMedia1160 = useMediaQuery(1160)

	const [spinner, setSpinner] = useState<boolean>(false)
	const [price, setPrice] = useState<number>(item.price)
	const attachUpdateCartItemTotalPrice = useUnit(updateCartItemTotalPrice)
	const attachRemoveShopingCartItem = useUnit(removeShopingCartItem)

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
		<li className={styles.order__cart__list__item}>
			<div className={styles.order__cart__list__item__left}>
				<div className={styles.order__cart__list__item__left__inner}>
					<div className={styles.order__cart__list__item__img}>
						{/*<img src={item.image} alt={item.name} />*/}
						<img src="/img/manufactures.jpg" alt={item.name} />
					</div>
					<Link
						href={`/catalog/${item.partId}`}
						passHref
						className={cn(styles.order__cart__list__item__text, darkModeClass)}
					>
						<span>
							{item.name.replace('.', '')},{item.parts_manufacturer},
							{item.boiler_manufacturer}
						</span>
					</Link>
				</div>
				{isMedia1160 &&
					(item.in_stock === 0 ? (
						<span className={styles.order__cart__list__item__empty}>
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
					))}
			</div>
			<div className={styles.order__cart__list__item__right}>
				{!isMedia1160 &&
					(item.in_stock === 0 ? (
						<span className={styles.order__cart__list__item__empty}>
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
					))}
				<span
					className={cn(styles.order__cart__list__item__price, darkModeClass)}
				>
					{formatPrice(price)} Тг
				</span>
				<button
					className={styles.order__cart__list__item__delete}
					onClick={removeItemFromCart}
				>
					{spinner ? (
						<span
							className={cn(spinnerStyles.spinner, spinnerDarkModeClass)}
							style={{ top: '-13px', left: '-30px', width: 25, height: 25 }}
						/>
					) : (
						'Удалить'
					)}
				</button>
			</div>
		</li>
	)
}
