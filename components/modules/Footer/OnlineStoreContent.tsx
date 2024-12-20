import styles from '@/styles/footer/index.module.scss'
import Link from 'next/link'

export const OnlineStoreContent = (): JSX.Element => {
	return (
		<ul className={styles.footer__top__item__list}>
			<li className={styles.footer__top__item__list__item}>
				<Link href='/catalog' passHref className={styles.footer__top__item__list__item__link}>Каталог</Link>
			</li>
			<li>
				<Link href='/shipping-payment' passHref className={styles.footer__top__item__list__item__link}>Доставка и оплата</Link>
			</li>
		</ul>
	)
}