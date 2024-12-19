/* eslint-disable max-len */
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'

export type FeedBackInputs = {
	name: string
	phone: string
	email: string
	message: string
}

export interface IFeedBackInput {
	register: UseFormRegister<FeedBackInputs>
	errors: Partial<FieldErrorsImpl<FeedBackInputs>> //Partial - Создает тип со всеми свойствами Type, установленными как необязательные. Эта утилита вернет тип, представляющий все подмножества данного типа.
	darkModeClass?: string
}
