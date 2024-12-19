/* eslint-disable @next/next/no-img-element */
import { useUnit } from 'effector-react'
import styles from '@/styles/part/index.module.scss'
import { $boilerPart } from '@/context/boilerPart'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useState } from 'react'
import { PartImagesItem } from './PartImagesItem'
import { PartSlider } from './PartSlider'

export const PartImageList = (): JSX.Element => {
	const boilerPart = useUnit($boilerPart)
	const isMobile = useMediaQuery(850)
	const images = boilerPart.images
		? (JSON.parse(boilerPart.images) as string[])
		: []
	const [currentImageSrc, setCurrentImageSrc] = useState<string>('')

	return (
		<section>
			<div className={styles.part__images}>
				{isMobile ? (
					<PartSlider images={images} />
				) : (
					<>
						<div className={styles.part__images__main}>
							{/*<img src={currentImageSrc || images[0]} alt={boilerPart.name} />*/}
							<img src="/img/manufactures.jpg" alt={boilerPart.name} />
						</div>
						<ul className={styles.part__images__list}>
							{images.map((item, i) => (
								<PartImagesItem
									key={i}
									src={item}
									alt={`image-${i + 1}`}
									callback={setCurrentImageSrc}
								/>
							))}
						</ul>
					</>
				)}
			</div>
		</section>
	)
}
