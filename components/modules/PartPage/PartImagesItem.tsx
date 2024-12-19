/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/part/index.module.scss'
import { IPartImagesItemProps } from '@/types/part'

export const PartImagesItem = ({
	src,
	callback,
	alt,
}: IPartImagesItemProps): JSX.Element => {
	const changeMainImage = () => callback(src)

	return (
		<li className={styles.part__images__list__item} onClick={changeMainImage}>
			{/*<img src={src} alt={alt} />*/}
			<img src="/img/manufactures.jpg" alt={alt} />
		</li>
	)
}
