import { getBestsellersOrNewFx } from '@/app/api/boilerParts'
import { BrandsSlider } from '@/components/modules/DashboardPage/BrandsSlider'
import styles from '@/styles/dashboard/index.module.scss'
import { IBoilerParts } from '@/types/boilerparts'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import { DashboardSlider } from '@/components/modules/DashboardPage/DashboardSlider'
import { $shopingCart } from '@/context/shopingCart'
import { motion, AnimatePresence } from 'framer-motion'
import { CartAlert } from '@/components/modules/DashboardPage/CartAlert'

const DashboardPage = (): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

	const [newParts, setNewParts] = useState<IBoilerParts>({} as IBoilerParts)
	const [bestsellers, setBestsellers] = useState<IBoilerParts>(
		{} as IBoilerParts
	)
	const [spinner, setSpinner] = useState<boolean>(false)
	const shopingCart = useUnit($shopingCart)
	const [showAlert, setShowAlert] = useState<boolean>(!!shopingCart.length)

	const closeAlert = () => {
		setShowAlert(false)
	}

	useEffect(() => {
		loadBoilerParts()
	}, [])

	useEffect(() => {
		if (shopingCart.length) {
			setShowAlert(true)
			return
		}
		setShowAlert(false)
	}, [shopingCart.length])

	const loadBoilerParts = async () => {
		try {
			setSpinner(true)
			const bestsellers = await getBestsellersOrNewFx(
				'/boiler-parts/bestsellers'
			)
			const newParts = await getBestsellersOrNewFx('/boiler-parts/new')

			setBestsellers(bestsellers)
			setNewParts(newParts)
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}

	return (
		<section className={styles.dashboard}>
			<div className={cn('container', styles.dashboard__container)}>
				<AnimatePresence>
					{showAlert && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className={cn(styles.dashboard__alert, darkModeClass)}
						>
							<CartAlert
								count={shopingCart.reduce(
									(defaultCount, item) => defaultCount + item.count,
									0
								)}
								closeAlert={closeAlert}
							/>
						</motion.div>
					)}
				</AnimatePresence>
				<div className={styles.dashboard__brands}>
					<BrandsSlider />
				</div>
				<h2 className={cn(styles.dashboard__title, darkModeClass)}>
					Детали для газовых котлов
				</h2>
				<div className={styles.dashboard__parts}>
					<h3 className={cn(styles.dashboard__parts__title, darkModeClass)}>
						Хиты продаж
					</h3>
					<DashboardSlider items={bestsellers.rows || []} spinner={spinner} />
				</div>
				<div className={styles.dashboard__parts}>
					<h3 className={cn(styles.dashboard__parts__title, darkModeClass)}>
						Новинки
					</h3>
					<DashboardSlider items={newParts.rows || []} spinner={spinner} />
				</div>
				<div className={styles.dashboard__about}>
					<h3
						className={cn(
							styles.dashboard__parts__title,
							styles.dashboard__about__title,
							darkModeClass
						)}
					>
						О компании
					</h3>
					<p className={cn(styles.dashboard__about__text, darkModeClass)}>
						Инструкции и схемы помогут разобраться в эксплуатации, определить
						неисправность и правильно выбрать запчасть для ремонта Вашего
						газового оборудования. Купить запчасть, деталь для ремонта газового
						котла возможно в любом населенном пункте Республики Казахстан:
						Осуществляем доставку запчасти к газовым котлам в следующие города:
						Петропавловск, Астана, Алматы.
					</p>
				</div>
			</div>
		</section>
	)
}

export default DashboardPage
