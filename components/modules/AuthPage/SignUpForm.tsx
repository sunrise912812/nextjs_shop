import styles from '@/styles/auth/index.module.scss'
import cn from 'classnames'
import { NameInput } from '@/components/elements/AuthPage/NameInput'
import { useForm } from 'react-hook-form'
import { EmailInput } from '@/components/elements/AuthPage/EmailInput'
import { PasswordInput } from '@/components/elements/AuthPage/PasswordInput'
import { signUpFx } from '@/app/api/auth'
import { showAuthError } from '@/utils/errors'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { useState } from 'react'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import { IInputs } from '@/components/elements/AuthPage/AuthInput.props'

export const SignUpForm = ({
	switchForm,
}: {
	switchForm: () => void
}): JSX.Element => {
	const [spinner, setSpinner] = useState(false)
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<IInputs>()

	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

	const onSubmit = async (data: IInputs) => {
		try {
			setSpinner(true)
			const userData = await signUpFx({
				url: '/users/signup',
				username: data.name,
				email: data.email,
				password: data.password,
			})

			if (!userData) {
				return
			}

			reset()
			switchForm()
		} catch (error) {
			showAuthError(error)
		} finally {
			setSpinner(false)
		}
	}

	return (
		<form
			className={cn(styles.form, darkModeClass)}
			onSubmit={handleSubmit(onSubmit)}
		>
			<h2 className={cn(styles.form_titl, styles.title, darkModeClass)}>
				Создать аккаунт
			</h2>
			<NameInput register={register} errors={errors} />
			<EmailInput register={register} errors={errors} />
			<PasswordInput register={register} errors={errors} />
			<button
				className={cn(
					styles.form__button,
					styles.button,
					styles.submit,
					darkModeClass
				)}
			>
				{spinner ? (
					<div className={spinnerStyles.spinner} />
				) : (
					'Зарегистрироваться'
				)}
			</button>
		</form>
	)
}
