import cn from 'classnames'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/feedbackForm/index.module.scss'
import { NameInput } from './NameInput'
import { useForm } from 'react-hook-form'
import { FeedBackInputs } from '@/types/feedbackForm'
import { PhoneInput } from './PhoneInput'
import { EmailInput } from './EmailInput'
import { MessageInput } from './MessageInput'
import { MutableRefObject, useRef, useState } from 'react'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'

export const FeedbackForm = (): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FeedBackInputs>()
	const [spinner, setSpinner] = useState<boolean>(false)
	const formRef = useRef() as MutableRefObject<HTMLFormElement>

	const submitForm = () => {
		setSpinner(true)
		emailjs
			.sendForm(
				'service_v0p5q8g',
				'template_vtxofi8',
				formRef.current,
				'KsrGYCzeKOQtENEDM'
			)
			.then((result) => {
				setSpinner(false)
				toast.success(`Сообщение отправлено! ${result.text}`)
			})
			.catch((error) => {
				setSpinner(false)
				toast.error(`Что-то пошло не так! ${error.text}`)
			})
			.finally(() => {
				setSpinner(false)
			})

		formRef.current.reset()
	}

	return (
		<div className={cn(styles.feedback_form, darkModeClass)}>
			<h3 className={cn(styles.feedback_form__title, darkModeClass)}>
				Форма обратной связи
			</h3>
			<form
				className={styles.feedback_form__form}
				onSubmit={handleSubmit(submitForm)}
				ref={formRef}
			>
				<NameInput
					register={register}
					errors={errors}
					darkModeClass={darkModeClass}
				/>
				<PhoneInput
					register={register}
					errors={errors}
					darkModeClass={darkModeClass}
				/>
				<EmailInput
					register={register}
					errors={errors}
					darkModeClass={darkModeClass}
				/>
				<MessageInput
					register={register}
					errors={errors}
					darkModeClass={darkModeClass}
				/>
				<div className={styles.feedback_form__form__btn}>
					<button>
						{spinner ? (
							<span
								className={spinnerStyles.spinner}
								style={{ top: '6px', left: '47%' }}
							/>
						) : (
							'Отправить сообщение'
						)}
					</button>
				</div>
			</form>
		</div>
	)
}
