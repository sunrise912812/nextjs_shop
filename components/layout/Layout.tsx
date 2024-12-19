import { ILayoutProps } from '@/types/common'
import { Footer } from '../modules/Footer/Footer'
import { Header } from '../modules/Header/Header'

export const Layout = ({ children }: ILayoutProps): JSX.Element => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}