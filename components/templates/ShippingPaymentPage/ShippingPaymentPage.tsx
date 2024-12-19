import styles from '@/styles/shippingPayment/index.module.scss'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import cn from 'classnames'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
	tabText1,
	tabText2,
	tabText3,
	tabText4,
} from '@/utils/shipping-payment'

const ShippingPaymentPage = (): JSX.Element => {
	const [tab1, setTab1] = useState<boolean>(true)
	const [tab2, setTab2] = useState<boolean>(false)
	const [tab3, setTab3] = useState<boolean>(false)
	const [tab4, setTab4] = useState<boolean>(false)
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

	const handelTab1 = () => {
		setTab1(true)
		setTab2(false)
		setTab3(false)
		setTab4(false)
	}

	const handelTab2 = () => {
		setTab1(false)
		setTab2(true)
		setTab3(false)
		setTab4(false)
	}

	const handelTab3 = () => {
		setTab1(false)
		setTab2(false)
		setTab3(true)
		setTab4(false)
	}

	const handelTab4 = () => {
		setTab1(false)
		setTab2(false)
		setTab3(false)
		setTab4(true)
	}

	return (
		<section className={styles.shipping_payment}>
			<div className="container">
				<h2 className={cn(styles.shipping_payment__title, darkModeClass)}>
					Доставка и оплата
				</h2>
				<div className={cn(styles.shipping_payment__tabs, darkModeClass)}>
					<ul className={styles.shipping_payment__tabs__controls}>
						<li
							className={cn(
								styles.shipping_payment__tabs__controls__item,
								darkModeClass,
								{
									[styles.active]: tab1 === true,
								}
							)}
						>
							<button className={darkModeClass} onClick={handelTab1}>
								Как работает курьерская доставка?
							</button>
						</li>
						<li
							className={cn(
								styles.shipping_payment__tabs__controls__item,
								darkModeClass,
								{
									[styles.active]: tab2 === true,
								}
							)}
						>
							<button className={darkModeClass} onClick={handelTab2}>
								Как получить товар и пункта самовывоза?
							</button>
						</li>
						<li
							className={cn(
								styles.shipping_payment__tabs__controls__item,
								darkModeClass,
								{
									[styles.active]: tab3 === true,
								}
							)}
						>
							<button className={darkModeClass} onClick={handelTab3}>
								Какие способы оплаты?
							</button>
						</li>
						<li
							className={cn(
								styles.shipping_payment__tabs__controls__item,
								darkModeClass,
								{
									[styles.active]: tab4 === true,
								}
							)}
						>
							<button className={darkModeClass} onClick={handelTab4}>
								Как узнать статус заказанного товара?
							</button>
						</li>
					</ul>
					<div
						className={cn(
							styles.shipping_payment__tabs__content,
							darkModeClass
						)}
					>
						{tab1 && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className={styles.shipping_payment__tabs__content__text}
							>
								{tabText1}
							</motion.div>
						)}
						{tab2 && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className={styles.shipping_payment__tabs__content__text}
							>
								{tabText2}
							</motion.div>
						)}
						{tab3 && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className={styles.shipping_payment__tabs__content__text}
							>
								{tabText3}
							</motion.div>
						)}
						{tab4 && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className={styles.shipping_payment__tabs__content__text}
							>
								{tabText4}
							</motion.div>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default ShippingPaymentPage
