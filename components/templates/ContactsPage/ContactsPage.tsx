import cn from 'classnames'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/contacts/index.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { MailSVG } from '@/components/elements/MailSVG/MailSVG'
import { FeedbackForm } from '@/components/modules/FeedbackForm/FeedbackForm'

const ContactsPage = ({ isWholesaleBuyersPage = false }): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const isMedia560 = useMediaQuery(560)

	return (
		<section className={styles.contacts}>
			<div className="container">
				<h2 className={cn(styles.contacts__title, darkModeClass)}>
					{isWholesaleBuyersPage ? 'Оптовым покупателям' : 'Контакты'}
				</h2>
				<div className={styles.contacts__inner}>
					{isWholesaleBuyersPage ? (
						<div className={cn(styles.contacts__list, darkModeClass)}>
							<p>
								<span>
									Условия оптовых заказов решаются индивидуально по телефону:{' '}
								</span>
								<span>+7 (555) 55-55-555</span>
							</p>
							<p>
								Либо опишите суть заказа в форме обртной связи и мы с вами
								свяжемся.
							</p>
						</div>
					) : (
						<ul className={cn(styles.contacts__list, darkModeClass)}>
							<li className={styles.contacts__list__item}>
								<h3 className={darkModeClass}>
									Магазин деталей для газовых котлов
								</h3>
							</li>
							<li className={cn(styles.contacts__list__item, darkModeClass)}>
								<span>Офис:</span>
								<span> г. Петропавловск, ул. ... д....</span>
							</li>
							<li className={cn(styles.contacts__list__item, darkModeClass)}>
								<span>Склад:</span>
								<span> г. Петропавловск, ул. ... д....</span>
							</li>
							<li className={cn(styles.contacts__list__item, darkModeClass)}>
								<span>График работы офиса:</span>
								<span> пн-пс: с 8:00 до 22:00</span>
							</li>
							<li className={cn(styles.contacts__list__item, darkModeClass)}>
								<span>Наш контактный телефон:</span>
								<span> +7(747) 555-55-55</span>
							</li>
							<li className={cn(styles.contacts__list__item, darkModeClass)}>
								<span>Время приемок завок:</span>
								<span> Пн-Вс: с 8:00 до 22:00</span>
							</li>
							<li className={cn(styles.contacts__list__item, darkModeClass)}>
								<span>Прием заказов электронным способом на сайте:</span>
								<span> круглосуточно</span>
							</li>
							<li className={cn(styles.contacts__list__item, darkModeClass)}>
								<span>Email:</span>
								<span className={styles.contacts__list__item__mail}>
									{isMedia560 && <MailSVG />} <span>info@zapchasti.kz</span>
								</span>
							</li>
						</ul>
					)}
					<FeedbackForm />
				</div>
			</div>
		</section>
	)
}

export default ContactsPage
