/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/catalog/index.module.scss'
import cn from 'classnames'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import { useState } from 'react'
import { IBoilerPart } from '@/types/boilerparts'
import Link from 'next/link'
import { formatPrice } from '@/utils/common'
import { $shopingCart } from '@/context/shopingCart'
import { CartHoverCheckedSVG } from '@/components/elements/CartHoverCheckedSVG/CartHoverCheckedSVG'
import { CartHoverSVG } from '@/components/elements/CartHoverSVG/CartHoverSVG'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { addToCartItemFx, removeFromCartFx } from '@/app/api/shoping-cart'
import { toast } from 'react-toastify'
import { updateShopingCart, removeShopingCartItem } from '@/context/shopingCart'
import { $user } from '@/context/user'

export const CatalogItem = ({ item }: { item: IBoilerPart }): JSX.Element => {
	const mode = useUnit($mode)
	const user = useUnit($user)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const [spinner, setSpinner] = useState<boolean>(false)
	const shopingCart = useUnit($shopingCart)
	const attachRemoveShopingCartItem = useUnit(removeShopingCartItem)
	const attachUpdateShopingCart = useUnit(updateShopingCart)
	const isInCart = shopingCart.some(
		(cartItem) => cartItem.partId === item.id
	) /*Проверяем находится ли элемент в корзине, метод some - проверяет, проходит ли хотя бы один элемент массива тест, реализованный предоставленной функцией*/

	const toggleToCart = async () => {
		try {
			setSpinner(true)
			if (isInCart) {
				await removeFromCartFx(`/shopping-cart/one/${item.id}`)
				attachRemoveShopingCartItem(item.id)
				return
			}
			const data = await addToCartItemFx({
				url: '/shopping-cart/add',
				username: user.username,
				partId: item.id,
			})
			attachUpdateShopingCart(data)
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}

	return (
		<li className={cn(styles.catalog__list__item, darkModeClass)}>
			{/*<img src={JSON.parse(item.images)[0]} alt={item.name} />*/}
			<img src="img/manufactures.jpg" alt={item.name} />
			<div className={styles.catalog__list__item__inner}>
				<Link href={`/catalog/${item.id}`} passHref>
					<h3 className={styles.catalog__list__item__title}>{item.name}</h3>
				</Link>
				<span className={styles.catalog__list__item__code}>
					Артикул: {item.vender_code}
				</span>
				<span className={styles.catalog__list__item__price}>
					{formatPrice(item.price)} тг
				</span>
			</div>
			<button
				className={cn(styles.catalog__list__item__cart, {
					[styles.added]: isInCart === true,
				})}
				disabled={spinner}
				onClick={toggleToCart}
			>
				{spinner ? (
					<div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
				) : (
					<span>{isInCart ? <CartHoverCheckedSVG /> : <CartHoverSVG />}</span>
				)}
			</button>
		</li>
	)
}
