import styles from '@/styles/auth/index.module.scss'
import { IAuthPageInput } from './AuthInput.props'

export const PasswordInput = ({ register, errors }: IAuthPageInput) => (
	<label htmlFor="" className={styles.form__label}>
		<input
			{...register('password', {
				required: 'Введите пароль!',
				minLength: 5,
				maxLength: 20,
			})}
			className={styles.form__input}
			type="password"
			placeholder="Password"
		/>
		{errors.password && (
			<span className={styles.error_alert}>{errors.password?.message}</span>
		)}
		{errors.password && errors.password.type === 'minLength' && (
			<span className={styles.error_alert}>Минимум 5 символов!</span>
		)}
		{errors.password && errors.password.type === 'maxLength' && (
			<span className={styles.error_alert}>Не более 20 символов!</span>
		)}
	</label>
)
