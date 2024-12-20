import { IFeedBackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'
import cn from 'classnames'

export const NameInput = ({
	register,
	errors,
	darkModeClass,
}: IFeedBackInput): JSX.Element => (
	<label className={cn(styles.feedback_form__form__label, darkModeClass)}>
		<span>Имя *</span>
		<input
			type="text"
			className={styles.feedback_form__form__input}
			placeholder="Иван"
			{...register('name', {
				required: 'Введите имя!',
				pattern: {
					value: /^[а-яА-Яa-zA-ZёЁ]*$/,
					message: 'Недопустимое значение!',
				},
				minLength: 2,
				maxLength: 15,
			})}
		/>
		{errors.name && (
			<span className={styles.error_alert}>{errors.name?.message}</span>
		)}
		{errors.name && errors.name.type === 'minLength' && (
			<span className={styles.error_alert}>Минимум 2 символа!</span>
		)}
		{errors.name && errors.name.type === 'maxLength' && (
			<span className={styles.error_alert}>Максимум 15 символов!</span>
		)}
	</label>
)
