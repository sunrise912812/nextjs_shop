import { Layout } from '@/components/layout/Layout'
import OrderPage from '@/components/templates/OrderPage/OrderPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Head from 'next/head'
import { Breadcrumbs } from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useCallback } from 'react'

function Order() {
	const getDefaultTextGenerator = useCallback(() => 'Оформление заказа', [])

	const getTextGenerator = useCallback((param: string) => param, [])
	const { shouldLoadContent } = useRedirectByUserCheck()
	return (
		<>
			<Head>
				<title>
					Аква термикс | {shouldLoadContent ? 'Оформление заказа' : ''}
				</title>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
			</Head>
			{shouldLoadContent && (
				<Layout>
					<main>
						<Breadcrumbs
							getDefaultTextGenerator={getDefaultTextGenerator}
							getTextGenerator={getTextGenerator}
						/>
						<OrderPage />
						<div className="overlay" />
					</main>
				</Layout>
			)}
		</>
	)
}

export default Order
