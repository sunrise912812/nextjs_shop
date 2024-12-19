import { ISignUpForm } from '@/components/modules/AuthPage/SignUpForm.interface'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface AuthInputProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	register: UseFormRegister<ISignUpForm>
	errors: FieldErrors<ISignUpForm>
}
