import { BrandsSliderArrowSVG } from '../BrandsSliderArrowSVG/BrandsSliderArrowSVG'
import styles from '@/styles/dashboard/index.module.scss'
import { IBrandsSliderArrow } from '@/types/elements'
import cn from 'classnames'

export const BrandsSliderNextArrow = (
	props: IBrandsSliderArrow
): JSX.Element => (
	<button
		className={cn(
			styles.dashboard__brands__slider__arrow,
			styles.dashboard__brands__slider__arrow_next,
			props.modeClass
		)}
		onClick={props.onClick}
	>
		<span>
			<BrandsSliderArrowSVG />
		</span>
	</button>
)
