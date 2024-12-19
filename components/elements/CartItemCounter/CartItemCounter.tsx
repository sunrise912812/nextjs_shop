import { ICartItemCounterProps } from '@/types/shopingCart'
import styles from '@/styles/cartPopup/index.module.scss'
import cn from 'classnames'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import { PlusSvg } from '../PlusSVG/PlusSVG'
import { MinusSvg } from '../MinusSVG/MinusSVG'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { updateCartItemFx } from '@/app/api/shoping-cart'
import {
	updateCartItemCount,
	updateCartItemTotalPrice,
} from '@/context/shopingCart'

export const CartItemCounter = ({
	totalCount,
	partId,
	initialCount,
	increasePrice,
	decrasePrice,
	priceOne,
}: ICartItemCounterProps): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const [spinner, setSpinner] = useState<boolean>(false)
	const [count, setCount] = useState<number>(initialCount)
	const [disableIncrase, setDisableIncrase] = useState<boolean>(false)
	const [disableDecrase, setDisableDiscrase] = useState<boolean>(false)
	const spinnerDarkModeClass =
		mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`
	const attachUpdateCartItemCount = useUnit(updateCartItemCount)
	const attachUpdateCartItemTotalPrice = useUnit(updateCartItemTotalPrice)

	useEffect(() => {
		if (count === 1) {
			setDisableDiscrase(true)
		}
		if (count === totalCount) {
			setDisableIncrase(true)
		}
	}, [count, totalCount])

	const increase = async () => {
		try {
			setSpinner(true)
			increasePrice()
			setDisableDiscrase(false)
			setCount(count + 1)
			const data = await updateCartItemFx({
				url: `/shopping-cart/count/${partId}`,
				payload: {
					count: count + 1,
				},
			})
			attachUpdateCartItemCount({ partId, count: data.count })

			const total_price = data.count * priceOne
			const dataTotalPrice = await updateCartItemFx({
				url: `/shopping-cart/total-price/${partId}`,
				payload: { total_price },
			})
			attachUpdateCartItemTotalPrice({
				partId,
				total_price: dataTotalPrice.total_price,
			})
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}

	const decrease = async () => {
		try {
			setSpinner(true)
			decrasePrice()
			setDisableIncrase(false)
			setCount(count - 1)
			const data = await updateCartItemFx({
				url: `/shopping-cart/count/${partId}`,
				payload: {
					count: count - 1,
				},
			})
			attachUpdateCartItemCount({ partId, count: data.count })

			const total_price = data.count * priceOne
			const dataTotalPrice = await updateCartItemFx({
				url: `/shopping-cart/total-price/${partId}`,
				payload: { total_price },
			})
			attachUpdateCartItemTotalPrice({
				partId,
				total_price: dataTotalPrice.total_price,
			})

		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}

	return (
		<div className={cn(styles.cart__popup__list__item__counter, darkModeClass)}>
			<button disabled={disableDecrase} onClick={decrease}>
				<MinusSvg />
			</button>
			<span>
				{spinner ? (
					<span
						className={cn(spinnerStyles.spinner, spinnerDarkModeClass)}
						style={{ top: 4, left: 33, width: 20, height: 20 }}
					/>
				) : (
					count
				)}
			</span>
			<button disabled={disableIncrase} onClick={increase}>
				<PlusSvg />
			</button>
		</div>
	)
}
