import cn from 'classnames'
import styles from '@/styles/footer/index.module.scss'
import Link from 'next/link'

export const CompanyContent = (): JSX.Element => (
	<ul className={styles.footer__top__item__list}>
		<li className={styles.footer__top__item__list__item}>
			<Link
				href="/about"
				passHref
				className={styles.footer__top__item__list__item__link}
			>
				О компании
			</Link>
		</li>
		<li className={styles.footer__top__item__list__item}>
			<Link
				href="/contacts"
				passHref
				className={styles.footer__top__item__list__item__link}
			>
				Обратная связь
			</Link>
		</li>
		<li className={styles.footer__top__item__list__item}>
			<Link
				href="/wholesale-buyers"
				passHref
				className={styles.footer__top__item__list__item__link}
			>
				Оптовым покупателям
			</Link>
		</li>
		<li>
			<Link
				href="/contacts"
				passHref
				className={styles.footer__top__item__list__item__link}
			>
				Контакты
			</Link>
		</li>
	</ul>
)
