import '@/styles/globals.css'
import { EffectorNext } from '@effector/next'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import NextNProgress from 'nextjs-progressbar'

export default function App({ Component, pageProps }: AppProps) {
	const [mounted, setMounted] = useState(false) //Создаем состояние чтобы отрисовывать компонент после рендеринга

	useEffect(() => {
		setMounted(true)
	}, [])
	return (
		mounted && (
			<EffectorNext values={pageProps.values} >
				<NextNProgress />
				<Component {...pageProps} />
				<ToastContainer
					position="bottom-right"
					hideProgressBar={false}
					closeOnClick
					rtl={false}
					limit={1}
					theme="light"
				/>
			</EffectorNext>
		)
	)
}
