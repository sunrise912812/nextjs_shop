import { IFeedBackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'
import cn from 'classnames'

export const EmailInput = ({
	register,
	errors,
	darkModeClass,
}: IFeedBackInput): JSX.Element => (
	<label className={cn(styles.feedback_form__form__label, darkModeClass)}>
		<span>Email *</span>
		<input
			type="email"
			className={styles.feedback_form__form__input}
			placeholder="pavel@gmail.com"
			{...register('email', {
				required: 'Введите Email!',
				pattern: {
					value: /\S+@\S+\.\S+/,
					message: 'Не правильный Email!',
				},
			})}
		/>
		{errors.email && (
			<span className={styles.error_alert}>{errors.email?.message}</span>
		)}
	</label>
)
