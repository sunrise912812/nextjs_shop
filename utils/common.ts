import { NextRouter } from 'next/router'

export const getWindowWidth = () => {
	const { innerWidth: windowWidth } =
		typeof window !== 'undefined' ? window : { innerWidth: 0 } //Из объекта windows вытащим ширину innerWidth
	return { windowWidth }
}

export const formatPrice = (x: number) =>
	x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const createSelectOption = (value: string | number) => ({
	value,
	label: value,
})

export const idGenerator = () => {
	const S4 = () =>
		(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	return (
		S4() +
		S4() +
		'-' +
		S4() +
		'-' +
		S4() +
		'-' +
		S4() +
		'-' +
		S4() +
		S4() +
		S4()
	)
}

export const getQueryParamOnFirstRender = (
	queryName: string,
	router: NextRouter
) =>
	router.query[queryName] ||
	router.asPath.match(new RegExp(`[&?]${queryName}=(.*)(&|$)`))
//Метод match() строковых значений извлекает результат сопоставления этой строки с регулярным выражением.

export const toogleClassNameForOverlayAndBody = (
	overlayClassName: string = 'open'
) => {
	document.querySelector('.overlay')?.classList.toggle(overlayClassName)
	document.querySelector('body')?.classList.toggle('overflow-hidden')
}

export const removeClassNameForOverlayAndBody = () => {
	document.querySelector('.overlay')?.classList.remove('open')
	document.querySelector('.overlay')?.classList.remove('open-search')
	document.querySelector('body')?.classList.remove('overflow-hidden')
}
