import axios from 'axios'

const instance = axios.create({
	withCredentials: true,//Указываем что автоизация будет через сессии, т.е будем использовать куки
	baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
})

export default instance
