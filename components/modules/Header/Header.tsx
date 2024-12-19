import styles from '@/styles/header/index.module.scss'
import { HeaderProps } from './Header.props'
import cn from 'classnames'
import { HeaderTop } from './HeaderTop'
import { HeaderBottom } from './HeaderBottom'

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	return (
		<header className={cn(styles.header, className)} {...props}>
			<HeaderTop />
			<HeaderBottom />
		</header >
	)
}