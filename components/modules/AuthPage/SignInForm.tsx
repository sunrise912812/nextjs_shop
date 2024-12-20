import styles from '@/styles/auth/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import cn from 'classnames'
import { NameInput } from '@/components/elements/AuthPage/NameInput'
import { useForm } from 'react-hook-form'
import { PasswordInput } from '@/components/elements/AuthPage/PasswordInput'
import { signInFx } from '@/app/api/auth'
import { useState } from 'react'
import { showAuthError } from '@/utils/errors'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import { useRouter } from 'next/router'
import { IInputs } from '@/components/elements/AuthPage/AuthInput.props'

export const SignInForm = (): JSX.Element => {
	const [spinner, setSpinner] = useState(false)
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<IInputs>()

	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const route = useRouter()

	const onSubmit = async (data: IInputs) => {
		try {
			setSpinner(true)
			await signInFx({
				url: '/users/login',
				username: data.name,
				password: data.password,
			})

			reset()
			route.push('/dashboard')
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
				Войти на сайт
			</h2>
			<NameInput register={register} errors={errors} />
			<PasswordInput register={register} errors={errors} />
			<button
				className={cn(
					styles.form__button,
					styles.button,
					styles.submit,
					darkModeClass
				)}
			>
				{spinner ? <div className={spinnerStyles.spinner} /> : 'Войти'}
			</button>
		</form>
	)
}
