import { LocationSVG } from '../LocationSVG/LocationSVG'
import { CityButtonProps } from './CityButton.props'
import styles from '@/styles/cityButton/index.module.scss'
import cn from 'classnames'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import { $userCity, setUserCity } from '@/context/user'
import { useState } from 'react'
import { getGeolocationFx } from '@/app/api/geolocation'
import { toast } from 'react-toastify'
import stylesSpinner from '@/styles/spinner/index.module.scss'

export const CityButton = ({ ...props }: CityButtonProps): JSX.Element => {
	const mode = useUnit($mode)
	const { city } = useUnit($userCity)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const [spinner, setSpinner] = useState<boolean>(false)
	const attachSetUserCity = useUnit(setUserCity)

	const getCity = () => {
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximunAge: 0,
		}
		const success = async (pos: GeolocationPosition) => {
			try {
				setSpinner(true)
				const { latitude, longitude } = pos.coords
				const { data } = await getGeolocationFx({ latitude, longitude })
				attachSetUserCity({
					city: data.features[0].properties.city,
					street: data.features[0].properties.street,
				})
			} catch (error) {
				toast.error((error as Error).message)
			} finally {
				setSpinner(false)
			}
		}
		const error = (error: GeolocationPositionError) =>
			toast.error(`${error.code} ${error.message}`)

		navigator.geolocation.getCurrentPosition(success, error, options)
	}

	return (
		<button {...props} className={styles.city} onClick={getCity}>
			<span className={cn(styles.city__span, darkModeClass)}>
				<LocationSVG />
			</span>
			<span className={cn(styles.city__text, darkModeClass)}>
				{spinner ? (
					<span
						className={stylesSpinner.spinner}
						style={{ top: '-10px', left: 10, width: 20, height: 20 }}
					/>
				) : city.length ? (
					city
				) : (
					'Город'
				)}
			</span>
		</button>
	)
}
