/* eslint-disable max-len */
import { IGeolocation } from '@/types/common'
import { createEffect } from 'effector'
import api from '../axiosClient'

export const getGeolocationFx = createEffect(
	async ({ latitude, longitude }: IGeolocation) => {
		const data = await api.get(
			`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=ru&apiKey=${process.env.NEXT_PUBLIC_GEOAPI_KEY}`,
			{ withCredentials: false }
		)
		return data
	}
)
