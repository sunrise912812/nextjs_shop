import styles from '@/styles/auth/index.module.scss';
import { AuthInputProps } from './AuthInput.props';

export const NameInput = ({ register, errors, ...props }: AuthInputProps) => {
	return (
		<label htmlFor='' className={styles.form__label}>
			<input {...register('name', {
				required: 'Введите имя!',
				minLength: 5,
				maxLength: 20,
				pattern: {
					value: /^[а-яА-Яa-zA-ZёЁ]*$/, //Указываем что только буквы можно указать в имени
					message: 'Недопустимое значение!'
				}
			})} className={styles.form__input} type="text" placeholder="Name" {...props} />
			{errors.name && (
				<span className={styles.error_alert}>{errors.name?.message}</span>
			)}
			{errors.name && errors.name.type === 'minLength' && (
				<span className={styles.error_alert}>Минимум 5 символов!</span>
			)}
			{errors.name && errors.name.type === 'maxLength' && (
				<span className={styles.error_alert}>Не более 20 символов!</span>
			)}
		</label>
	)
}