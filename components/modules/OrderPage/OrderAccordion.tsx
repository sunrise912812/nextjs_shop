import { IOrderAccordionProps } from '@/types/order'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '@/styles/order/index.module.scss'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import cn from 'classnames'
import { DoneSvg } from '@/components/elements/DoneSVG/DoneSVG'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { EditSvg } from '@/components/elements/EditSVG/EditSVG'
import { useState } from 'react'
import { $shopingCart, $totalPrice } from '@/context/shopingCart'
import { CartPopupItem } from '../Header/CartPopupItem'
import { OrderItem } from './OrderItem'
import { formatPrice } from '@/utils/common'

export const OrderAccordion = ({
	setOrderIsReady,
	showDoneIcon,
}: IOrderAccordionProps): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const isMedia550 = useMediaQuery(550)
	const [expanded, setExpanded] = useState<boolean>(true)
	const shoppingCart = useUnit($shopingCart)
	const attachTotalPrice = useUnit($totalPrice)

	const openAccordion = () => {
		setExpanded(true)
		setOrderIsReady(false)
	}

	const closeAccordion = () => {
		setExpanded(false)
		setOrderIsReady(true)
	}

	return (
		<>
			<motion.div
				initial={false}
				className={cn(styles.order__cart__title, darkModeClass)}
			>
				<h3 className={cn(styles.order__cart__title__text, darkModeClass)}>
					{showDoneIcon && (
						<span>
							<DoneSvg />
						</span>
					)}
					Корзина
				</h3>
				<button
					className={styles.order__cart__title__btn}
					onClick={openAccordion}
				>
					<span>
						<EditSvg />
					</span>
					{isMedia550 ? '' : 'Редактировать'}
				</button>
			</motion.div>

			<AnimatePresence initial={false}>
				{expanded && (
					<motion.div
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={{
							open: { opacity: 1, height: 'auto' },
							collapsed: { opacity: 0, height: 0 },
						}}
						style={{ overflow: 'hidden' }}
						transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
					>
						<div className={cn(styles.order__cart__content, darkModeClass)}>
							<ul className={styles.order__cart__list}>
								{shoppingCart.length ? (
									shoppingCart.map((item) =>
										isMedia550 ? (
											<CartPopupItem key={item.id} item={item} />
										) : (
											<OrderItem key={item.id} item={item} />
										)
									)
								) : (
									<li className={styles.order__cart__empty}>
										<span
											className={cn(
												styles.order__cart__empty__text,
												darkModeClass
											)}
										>
											Корзина пуста
										</span>
									</li>
								)}
							</ul>
							<div className={styles.order__cart__footer}>
								<div className={styles.order__cart__footer__total}>
									<span
										className={cn(
											styles.order__cart__footer__text,
											darkModeClass
										)}
									>
										Общая сумма заказа:
									</span>
									<span className={styles.order__cart__footer__price}>
										{formatPrice(attachTotalPrice)} Тг
									</span>
								</div>
								<button
									className={styles.order__cart__footer__btn}
									onClick={closeAccordion}
									disabled={!shoppingCart.length}
								>
									Продолжить
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
