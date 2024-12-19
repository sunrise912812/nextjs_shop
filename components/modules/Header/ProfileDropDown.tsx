import { ProfileSVG } from '@/components/elements/ProfileSVG/ProfileSVG'
import { IWrappedComponentProps } from '@/types/common'
import { forwardRef } from 'react'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import { $user } from '@/context/user'
import { AnimatePresence, motion } from 'framer-motion'
import { LogOutSVG } from '@/components/elements/LogOutSVG/LogOutSVG'
import { WithClickOutside } from '@/utils/WithClickOutside'
import styles from '@/styles/profileDropDown/index.module.scss'
import cn from 'classnames'
import { logoutFx } from '../../../app/api/auth'
import { useRouter } from 'next/router'

const ProfileDropDown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
	({ open, setOpen }, ref) => {
		const mode = useUnit($mode)
		const user = useUnit($user)
		const router = useRouter()
		const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

		const togleProfileDropDown = () => setOpen(!open)

		const handleLogOut = async () => {
			await logoutFx('/users/logout')
			router.push('/')
		}

		return (
			<div className={styles.profile} ref={ref}>
				<button className={styles.profile__btn} onClick={togleProfileDropDown}>
					<span className={styles.profile__span}>
						<ProfileSVG />
					</span>
				</button>
				<AnimatePresence>
					{open && (
						<motion.ul
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							className={cn(styles.profile__dropdown, darkModeClass)}
							style={{ transformOrigin: 'right top' }} //Укажем откуда будет начинаться анимация
						>
							<li className={styles.profile__dropdown__user}>
								<span className={cn(styles.profile__dropdown__username, darkModeClass)}>
									{user.username}
								</span>
								<span className={cn(styles.profile__dropdown__email, darkModeClass)}>
									{user.email}
								</span>
							</li>
							<li className={styles.profile__dropdown__item}>
								<button className={styles.profile__dropdown__item__btn} onClick={handleLogOut}>
									<span className={cn(styles.profile__dropdown__item__text, darkModeClass)}>
										Выйти
									</span>
									<span className={cn(styles.profile__dropdown__item__svg, darkModeClass)}>
										<LogOutSVG />
									</span>
								</button>
							</li>
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
		)
	}
)

ProfileDropDown.displayName = 'ProfileDropDown'

export default WithClickOutside(ProfileDropDown)
