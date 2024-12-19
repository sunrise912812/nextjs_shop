/* eslint-disable @next/next/no-img-element */
import { FooterProps } from './Footer.props'
import cn from 'classnames'
import styles from '@/styles/footer/index.module.scss'
import { FooterLogo } from './FooterLogo'
import { OnlineStoreContent } from './OnlineStoreContent'
import { CompanyContent } from './CompanyContent'
import Link from 'next/link'
import { MarkerSVG } from '@/components/elements/MarkerSVG/MarkerSVG'
import { PhoneSVG } from '@/components/elements/PhoneSVG/PhoneSVG'
import { MailSVG } from '@/components/elements/MailSVG/MailSVG'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Accordion } from '@/components/elements/Accordion/Accordion'

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	const isMedia750 = useMediaQuery(750)
	const isMedia500 = useMediaQuery(500)

	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<div className={styles.footer__container}>
				<div className={styles.footer__top}>
					{!isMedia750 && <FooterLogo />}
					<div className={styles.footer__top__inner}>
						<div className={styles.footer__top__item}>
							{!isMedia500 && (
								<>
									<h3 className={styles.footer__top__item__title}>
										Интернет магазин
									</h3>
									<OnlineStoreContent />
								</>
							)}
							{isMedia500 && (
								<Accordion
									title={'Интернет магазин'}
									titleClass={styles.footer__top__item__title}
									arrowOpenClass={styles.open}
								>
									<OnlineStoreContent />
									<div style={{ height: '17px' }}></div>
								</Accordion>
							)}
						</div>
						<div className={styles.footer__top__item}>
							{!isMedia500 && (
								<>
									<h3 className={styles.footer__top__item__title}>Компания</h3>
									<CompanyContent />
								</>
							)}
							{isMedia500 && (
								<Accordion
									title={'Компания'}
									titleClass={styles.footer__top__item__title}
									arrowOpenClass={styles.open}
								>
									<CompanyContent />
									<div style={{ height: '17px' }}></div>
								</Accordion>
							)}
						</div>
					</div>
					<div className={styles.footer__top__item}>
						<h3 className={styles.footer__top__item__title}>Контакты</h3>
						<ul
							className={cn(
								styles.footer__top__item__list,
								styles.footer__top__item__contacts
							)}
						>
							<li className={styles.footer__top__item__list__item}>
								<Link
									href="/contacts"
									passHref
									className={styles.footer__top__item__list__item__link}
								>
									<span>Наш адрес:</span>
									<span>г. Петропавловск, ул. ... д....</span>
									<span>
										<MarkerSVG />
									</span>
								</Link>
							</li>
							<li className={styles.footer__top__item__list__item}>
								<Link
									href="tel:+77472660556"
									passHref
									className={styles.footer__top__item__list__item__link}
								>
									<span>Наш контактный телефон:</span>
									<span>+7(747) 266-05-56</span>
									<span>
										<PhoneSVG />
									</span>
								</Link>
							</li>
							<li className={styles.footer__top__item__list__item}>
								<Link
									href="mailto:pavel.bazarkin.test@mail.ru"
									passHref
									className={styles.footer__top__item__list__item__link}
								>
									<span>Email:</span>
									<span>pavel.bazarkin.test@mail.ru</span>
									<span>
										<MailSVG />
									</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className={styles.footer__bottom}>
					<div className={styles.footer__bottom__block}>
						<div className={styles.footer__bottom__block__left}>
							<h3 className={styles.footer__bottom__block__title}>
								Мы принимаем к оплате:
							</h3>
							<ul className={styles.footer__bottom__block__pay}>
								<li className={styles.footer__bottom__block__pay__item}>
									<img src="/img/pay.png" alt="apple-pay" />
								</li>
								<li className={styles.footer__bottom__block__pay__item}>
									<img src="/img/gpay.png" alt="google-pay" />
								</li>
								<li className={styles.footer__bottom__block__pay__item}>
									<img src="/img/master-card.png" alt="master-card" />
								</li>
								<li className={styles.footer__bottom__block__pay__item}>
									<img src="/img/visa.png" alt="visa" />
								</li>
							</ul>
						</div>
						<div className={styles.footer__bottom__block__right}>
							<h3 className={styles.footer__bottom__block__title}>
								Мы в соцсети:
							</h3>
							<ul className={styles.footer__bottom__block__social}>
								<li className={styles.footer__bottom__block__social__item}>
									<Link
										href="#"
										passHref
										className={styles.footer__bottom__block__social__item_vk}
									/>
								</li>
								<li className={styles.footer__bottom__block__social__item}>
									<Link
										href="#"
										passHref
										className={styles.footer__bottom__block__social__item_fb}
									/>
								</li>
								<li className={styles.footer__bottom__block__social__item}>
									<Link
										href="#"
										passHref
										className={styles.footer__bottom__block__social__item_inst}
									/>
								</li>
								<li className={styles.footer__bottom__block__social__item}>
									<Link
										href="#"
										passHref
										className={styles.footer__bottom__block__social__item_ytb}
									/>
								</li>
							</ul>
						</div>
					</div>
					{isMedia750 && <FooterLogo />}
					<div className={styles.footer__bottom__block}>
						<p className={styles.footer__bottom__block__copyright}>
							© «Детали для газовых котлов» 2024.
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
