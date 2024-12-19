import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface CartAlertProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	count: number
	closeAlert: VoidFunction
}
