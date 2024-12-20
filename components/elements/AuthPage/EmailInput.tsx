import styles from '@/styles/auth/index.module.scss'
import { IAuthPageInput } from './AuthInput.props'

export const EmailInput = ({ register, errors }: IAuthPageInput) => (
	<label htmlFor="" className={styles.form__label}>
		<input
			{...register('email', {
				required: 'Введите email!',
				pattern: {
					value: /\S+@\S+\.\S+/, //Указываем что только буквы можно указать в имени
					message: 'Неправильный Email!',
				},
			})}
			className={styles.form__input}
			type="email"
			placeholder="Email"
		/>
		{errors.email && (
			<span className={styles.error_alert}>{errors.email?.message}</span>
		)}
	</label>
)
