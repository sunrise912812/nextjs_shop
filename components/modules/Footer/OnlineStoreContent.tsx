import { OnlineStroreContentProps } from './OnlineStoteContent.props'
import cn from 'classnames'
import styles from '@/styles/footer/index.module.scss'
import Link from 'next/link'

export const OnlineStoreContent = ({ className, props }: OnlineStroreContentProps): JSX.Element => {
	return (
		<ul className={cn(className, styles.footer__top__item__list)} {...props}>
			<li className={styles.footer__top__item__list__item}>
				<Link href='/catalog' passHref className={styles.footer__top__item__list__item__link}>Каталог</Link>
			</li>
			<li>
				<Link href='/shipping-payment' passHref className={styles.footer__top__item__list__item__link}>Доставка и оплата</Link>
			</li>
		</ul>
	)
}