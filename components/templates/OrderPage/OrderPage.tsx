import styles from '@/styles/order/index.module.scss'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import cn from 'classnames'
import {
	$shopingCart,
	$totalPrice,
	setShopingCart,
} from '@/context/shopingCart'
import { formatPrice } from '@/utils/common'
import { OrderAccordion } from '@/components/modules/OrderPage/OrderAccordion'
import { useEffect, useState } from 'react'
import { checkPaymentFx, makePaymentFx } from '@/app/api/payment'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { removeFromCartFx } from '@/app/api/shoping-cart'
import { $user, $userCity } from '@/context/user'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const OrderPage = (): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const attachShoppingCart = useUnit($shopingCart)
	const attachTotalPrice = useUnit($totalPrice)
	const [orderIsReady, setOrderIsReady] = useState<boolean>(false)
	const [aggrement, setAggrement] = useState<boolean>(false)
	const [spinner, setSpinner] = useState<boolean>(false)
	const router = useRouter()
	const user = useUnit($user)
	const userCity = useUnit($userCity)
	const attachSetShoppingCart = useUnit(setShopingCart)

	const handleAggrementChange = () => setAggrement(!aggrement)

	useEffect(() => {
		const paymentId = sessionStorage.getItem('paymentId')
		if (paymentId) {
			checkPayment(paymentId)
		}
	}, [])

	const makePay = async () => {
		try {
			setSpinner(true)
			const data = await makePaymentFx({
				url: '/payment',
				amount: attachTotalPrice,
				description: `Заказ №1 ${userCity.city.length ? `Город: ${userCity.city}, Улица: ${userCity.street}` : ''}`,
			})
			sessionStorage.setItem('paymentId', data.id)
			router.push(data.confirmation.confirmation_url)
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}

	const resetCart = async () => {
		sessionStorage.removeItem('paymentId')
		await removeFromCartFx(`/shopping-cart/all/${user.userId}`)
		attachSetShoppingCart([])
	}

	const checkPayment = async (paymentId: string) => {
		try {
			const data = await checkPaymentFx({
				url: '/payment/info',
				paymentId,
			})
			if (data.status === 'succeeded') {
				resetCart()
				return
			}
			sessionStorage.removeItem('paymentId')
		} catch (error) {
			console.log((error as Error).message)
			resetCart()
		}
	}

	return (
		<section className={styles.order}>
			<div className="container">
				<h2 className={cn(styles.order__title, darkModeClass)}>
					Оформление заказа
				</h2>
				<div className={styles.order__inner}>
					<div className={styles.order__cart}>
						<OrderAccordion
							setOrderIsReady={setOrderIsReady}
							showDoneIcon={orderIsReady}
						/>
					</div>
					<div className={styles.order__pay}>
						<h3 className={cn(styles.order__pay__title, darkModeClass)}>
							Итого
						</h3>
						<div className={cn(styles.order__pay__inner, darkModeClass)}>
							<div className={styles.order__pay__goods}>
								<span>
									Товары (
									{attachShoppingCart.reduce(
										(defaultCount, item) => defaultCount + item.count,
										0
									)}
									)
								</span>
								<span>{formatPrice(attachTotalPrice)} Тг</span>
							</div>
							<div className={styles.order__pay__total}>
								<span>На сумму</span>
								<span className={darkModeClass}>
									{formatPrice(attachTotalPrice)} Тг
								</span>
							</div>
							<button
								className={styles.order__pay__btn}
								disabled={!(orderIsReady && aggrement)}
								onClick={makePay}
							>
								{spinner ? (
									<span
										className={spinnerStyles.spinner}
										style={{ top: '6px', left: '47%' }}
									/>
								) : (
									'Подтвердить заказ'
								)}
							</button>
							<label className={cn(styles.order__pay__rights, darkModeClass)}>
								<input
									type="checkbox"
									className={styles.order__pay__rights__input}
									onChange={handleAggrementChange}
									checked={aggrement}
								/>
								<span className={styles.order__pay__rights__text}>
									<strong>Согласен с условиями</strong> Правил пользования
									торговой площадкой и правилами возврата
								</span>
							</label>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default OrderPage
