import {
	removeClassNameForOverlayAndBody,
	toogleClassNameForOverlayAndBody,
} from '@/utils/common'
import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { setSearchInputZIndex } from '@/context/header'

export const usePopup = () => {
	const [open, setOpen] = useState<boolean>(false)
	const attactSetSearchInputZIndex = useUnit(setSearchInputZIndex)

	const togleOpen = () => {
		window.scrollTo(0, 0) //Скролимся наверх
		toogleClassNameForOverlayAndBody()
		setOpen(!open)
	}

	const closePopup = () => {
		removeClassNameForOverlayAndBody()
		setOpen(false)
		attactSetSearchInputZIndex(1)
	}

	useEffect(() => {
		const overlay = document.querySelector('.overlay')
		overlay?.addEventListener('click', closePopup)

		return () => overlay?.removeEventListener('click', closePopup)
	}, [open])

	return { togleOpen, open, closePopup }
}
