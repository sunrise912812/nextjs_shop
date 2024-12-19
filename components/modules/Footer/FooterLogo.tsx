/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import styles from '@/styles/footer/index.module.scss'

export const FooterLogo = () => (
	<div className={styles.footer__top__item}>
		<Link href="/dashboard" passHref className={styles.footer__top__item__logo}>
			<img src="/img/logo-footer.svg" alt="logo" />
			<span className={styles.footer__top__item__logo__text}>Детеали для газовых котлов</span>
		</Link>
	</div>
)
