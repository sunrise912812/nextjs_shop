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
import { BrandsSliderNextArrow } from '@/components/elements/BrandsSliderNextArrow/BrandsSliderNextArrow'
import { BrandsSliderPrevArrow } from '@/components/elements/BrandsSliderPrevArrow/BrandsSliderPrevArrow'

export const BrandsSlider = (): JSX.Element => {
	const isMedia768 = useMediaQuery(768)
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

	const brandsItems = [
		{ id: 1, img: '/img/brand-1.png', alt: 'brand-1' },
		{ id: 2, img: '/img/brand-2.svg', alt: 'brand-2' },
		{ id: 3, img: '/img/brand-3.png', alt: 'brand-3' },
		{ id: 4, img: '/img/brand-4.png', alt: 'brand-4' },
		{ id: 5, img: '/img/brand-3.png', alt: 'brand-5' },
		{ id: 6, img: '/img/brand-2.svg', alt: 'brand-6' },
		{ id: 7, img: '/img/brand-4.png', alt: 'brand-7' },
		{ id: 8, img: '/img/brand-2.svg', alt: 'brand-8' },
		{ id: 9, img: '/img/brand-1.png', alt: 'brand-9' },
		{ id: 10, img: '/img/brand-2.svg', alt: 'brand-10' },
		{ id: 11, img: '/img/brand-4.png', alt: 'brand-11' },
		{ id: 12, img: '/img/brand-3.png', alt: 'brand-12' },
	]

	useEffect(() => {
		const slider = document.querySelector(
			`.${styles.dashboard__brands__slider}`
		)
		const list = slider?.querySelector('.slick-list') as HTMLElement
		list.style.height = isMedia768 ? '60px' : '80px'
	}, [isMedia768])

	const settings = {
		dots: false,
		infinite: true,
		slidesToScroll: 1,
		variableWidth: true,
		autoplay: true,
		speed: 500,
		nextArrow: <BrandsSliderNextArrow modeClass={darkModeClass} />,
		prevArrow: <BrandsSliderPrevArrow modeClass={darkModeClass} />,
	}

	return (
		<Slider {...settings} className={styles.dashboard__brands__slider}>
			{brandsItems.map((item) => (
				<div
					className={cn(styles.dashboard__brands__slide, darkModeClass)}
					key={item.id}
					style={{ width: isMedia768 ? '124px' : '180px' }}
				>
					<img src={item.img} alt={item.alt} />
				</div>
			))}
		</Slider>
	)
}
