import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface SignUpFormProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	swithForm: () => void
}
