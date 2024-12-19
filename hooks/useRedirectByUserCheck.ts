import { checkUserAuthFx } from '@/app/api/auth'
import { setUser } from '@/context/user'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useUnit } from 'effector-react'

const useRedirectByUserCheck = (isAuthPage = false) => {
	const attachUser = useUnit(setUser)
	const [shouldLoadContent, setShouldLoadContent] = useState<boolean>(false)
	const router = useRouter()
	const shouldCheckAuth = useRef(true)

	useEffect(() => {
		if (shouldCheckAuth.current) {
			shouldCheckAuth.current = false
			checkUser()
		}
	}, [])

	const checkUser = async () => {
		const user = await checkUserAuthFx('/users/login-check')
		if (isAuthPage) {
			if (!user) {
				setShouldLoadContent(true)
				return
			}
			router.push('/dashboard')
			return
		}
		if (user) {
			attachUser(user)
			setShouldLoadContent(true)
			return
		}

		router.push('/')
	}

	return { shouldLoadContent }
}

export default useRedirectByUserCheck
