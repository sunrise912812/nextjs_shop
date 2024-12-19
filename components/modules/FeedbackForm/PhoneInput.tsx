import { IFeedBackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'
import cn from 'classnames'

export const PhoneInput = ({
	register,
	errors,
	darkModeClass,
}: IFeedBackInput): JSX.Element => (
	<label className={cn(styles.feedback_form__form__label, darkModeClass)}>
		<span>Телефон *</span>
		<input
			className={styles.feedback_form__form__input}
			placeholder="+ 7 777 777 77 77"
			type="tel"
			{...register('phone', {
				required: 'Введите телефон!',
				pattern: {
					value: /^\d*[1-9]\d*$/,
					message: 'Недопустимое значение!',
				},
				minLength: 11,
				maxLength: 11,
			})}
		/>
		{errors.phone && (
			<span className={styles.error_alert}>{errors.phone?.message}</span>
		)}
		{errors.phone && errors.phone.type === 'minLength' && (
			<span className={styles.error_alert}>Минимум 11 цифр!</span>
		)}
		{errors.phone && errors.phone.type === 'maxLength' && (
			<span className={styles.error_alert}>Не более 11 цифр!</span>
		)}
	</label>
)
