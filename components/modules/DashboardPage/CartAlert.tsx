import { CartAlertProps } from './CartAlert.props'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/dashboard/index.module.scss'
import cn from 'classnames'
import { formatPrice } from '@/utils/common'
import Link from 'next/link'
import { $totalPrice } from '@/context/shopingCart'

export const CartAlert = ({
	count,
	closeAlert,
}: CartAlertProps): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const attachTotalPrice = useUnit($totalPrice)

	const showCartMessage = (count: string) => {
		if (count.endsWith('1')) {
			return 'товар'
		}
		if (count.endsWith('2') || count.endsWith('3') || count.endsWith('4')) {
			return 'товара'
		}
		return 'товаров'
	}

	return (
		<>
			<div className={cn(styles.dashboard__alert__left, darkModeClass)}>
				<span>В корзине {count} {showCartMessage(count.toString())}</span>
				<span>На сумму {formatPrice(attachTotalPrice)} тг</span>
			</div>
			<div className={styles.dashboard__alert__right}>
				<Link
					href="/order"
					className={styles.dashboard__alert__btn_cart}
					passHref
				>
					Перейти в корзину
				</Link>
				<Link
					href="/order"
					className={styles.dashboard__alert__btn_order}
					passHref
				>
					Оформить заказ
				</Link>
			</div>
			<button
				className={styles.dashboard__alert__btn_close}
				onClick={closeAlert}
			/>
		</>
	)
}
