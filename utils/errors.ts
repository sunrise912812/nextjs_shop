import { HTTPStatus } from '@/constans';
import { AxiosError } from 'axios'
import { toast } from 'react-toastify';

export const showAuthError = (error: unknown) => {
	const axiosError = error as AxiosError;

	if (axiosError.response) { // Проверяем что у нас есть ошибка
		if (axiosError.response.status === HTTPStatus.UNAUTHORIZED) {
			toast.error('Не верное имя пользователя или пароль!')
			return
		}
	}

	toast.error((error as Error).message);
}