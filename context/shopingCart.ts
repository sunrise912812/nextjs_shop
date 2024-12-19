import { IShopingCartItem } from '@/types/shopingCart'
import { createDomain } from 'effector'

const shopingCart = createDomain()

export const setShopingCart = shopingCart.createEvent<IShopingCartItem[]>()
export const updateShopingCart = shopingCart.createEvent<IShopingCartItem>()
export const removeShopingCartItem = shopingCart.createEvent<number>()
export const updateCartItemTotalPrice = shopingCart.createEvent<{
	partId: number
	total_price: number
}>()
export const updateCartItemCount = shopingCart.createEvent<{
	partId: number
	count: number
}>()
export const setTotalPrice = shopingCart.createEvent<number>()
export const setDisableCart = shopingCart.createEvent<boolean>()

const remove = (cartItems: IShopingCartItem[], partId: number) =>
	cartItems.filter((item) => item.partId !== partId)

function updateCartItem<T>(
	cartItems: IShopingCartItem[],
	partId: number,
	payload: T
) {
	return cartItems.map((item) => {
		if (item.partId === partId) {
			return {
				...item,
				...payload,
			}
		}
		return item
	})
}

export const $shopingCart = shopingCart
	.createStore<IShopingCartItem[]>([])
	.on(setShopingCart, (_, shopingCart) => shopingCart)
	.on(updateShopingCart, (state, cartItem) => [...state, cartItem])
	.on(removeShopingCartItem, (state, partId) => [...remove(state, partId)])
	.on(updateCartItemTotalPrice, (state, { partId, total_price }) => [
		...updateCartItem(state, partId, { total_price }),
	])
	.on(updateCartItemCount, (state, { partId, count }) => [
		...updateCartItem(state, partId, { count }),
	])

export const $totalPrice = shopingCart
	.createStore<number>(0)
	.on(setTotalPrice, (_, value) => value)

export const $disableCart = shopingCart
	.createStore<boolean>(false)
	.on(setDisableCart, (_, value) => value)
