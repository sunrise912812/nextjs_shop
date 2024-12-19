/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick'
import styles from '@/styles/dashboard/index.module.scss'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import cn from 'classnames'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useEffect } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { IDashboardSlider } from '@/types/dashboard'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import Link from 'next/link'
import { formatPrice } from '@/utils/common'

export const DashboardSlider = ({
	items,
	spinner,
	goToPartPage,
}: IDashboardSlider): JSX.Element => {

	const isMedia768 = useMediaQuery(768)
	const isMedia1366 = useMediaQuery(1366)
	const isMedia800 = useMediaQuery(800)
	const isMedia560 = useMediaQuery(560)
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const darkModeClassSkeleton = mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''

	useEffect(() => {
		const slider = document.querySelectorAll(
			`.${styles.dashboard__slider}`
		)

		slider.forEach((item) => {
			const list = item.querySelector('.slick-list') as HTMLElement
			list.style.height = isMedia560 ? '276px' : '390px'
			list.style.padding = '0 5px'
			list.style.marginRight = isMedia560 ? '-8px' : isMedia800 ? '-15px' : '0'
		})
	}, [isMedia560, isMedia800])

	const settings = {
		dots: false,
		infinite: true,
		variableWidth: true,
		autoplay: true,
		speed: 500,
		arrows: false,
		slidesToScroll: isMedia768 ? 1 : 2,
	}

	const width = {
		width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344,
	}

	return (
		<Slider {...settings} className={styles.dashboard__slider}>
			{spinner
				? [...Array(8)].map((_, i) => {
					return (
						<div className={cn(skeletonStyles.skeleton__item, darkModeClassSkeleton)} key={i} style={width}>
							<div className={skeletonStyles.skeleton__item__light} />
						</div>
					)
				})
				: items.length ? (
					items.map((item) => (
						<div key={item.id} style={width} className={cn(styles.dashboard__slide, darkModeClass)}>
							{/*<img src={JSON.parse(item.images)[0]} alt={item.name} />*/}
							<img src='/img/manufactures.jpg' alt={item.name} />
							<div className={styles.dashboard__slide__inner}>
								<Link href={goToPartPage ? `/catalog/${item.id}` : 'catalog'} passHref>
									<h3 className={styles.dashboard__slide__title}>{item.name}</h3>
								</Link>
								<span className={styles.dashboard__slide__code}>Артикул: {item.vender_code}</span>
								<span className={styles.dashboard__slide__price}>{formatPrice(item.price)} т</span>
							</div>
						</div>
					))
				) : (<span>Список товаров пуст...</span>)}
		</Slider >
	)
}
