import { IFeedBackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'
import cn from 'classnames'

export const MessageInput = ({
	register,
	errors,
	darkModeClass,
}: IFeedBackInput): JSX.Element => (
	<label className={cn(styles.feedback_form__form__label, darkModeClass)}>
		<textarea
			className={styles.feedback_form__form__textarea}
			placeholder="Введите ваше сообщение (от 20 до 300 символов)"
			{...register('message', {
				required: 'Введите сообщение!',
				minLength: 20,
				maxLength: 300,
			})}
		/>
		{errors.message && (
			<span className={styles.error_alert}>{errors.message?.message}</span>
		)}
		{errors.message && errors.message.type === 'minLength' && (
			<span className={styles.error_alert}>Минимум 20 символов!</span>
		)}
		{errors.message && errors.message.type === 'maxLength' && (
			<span className={styles.error_alert}>Максимум 300 симвлов!</span>
		)}
	</label>
)
