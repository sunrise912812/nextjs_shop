import { IWrappedComponentProps } from '@/types/common'
import {
	ForwardRefExoticComponent,
	RefAttributes,
	useEffect,
	useRef,
	useState,
	MutableRefObject,
} from 'react'

export const WithClickOutside = (
	WrappedComponent: ForwardRefExoticComponent<
		IWrappedComponentProps & RefAttributes<HTMLDivElement>
	>
) => {
	const Component = () => {
		const [open, setOpen] = useState<boolean>(false)
		const ref = useRef() as MutableRefObject<HTMLDivElement>

		useEffect(() => {
			const handleClickOutSide = (e: MouseEvent) => {
				if (!ref.current?.contains(e.target as HTMLDivElement)) {
					//Проверяем является ли узел потомком div элемента
					setOpen(false)
				}
			}

			document.addEventListener('mousedown', handleClickOutSide)

			return () => document.removeEventListener('mousedown', handleClickOutSide)
		}, [ref])

		return <WrappedComponent open={open} setOpen={setOpen} ref={ref} />
	}

	return Component
}
