export interface IShopingCartItem {
	id: number
	userId: number
	partId: number
	boiler_manufacturer: string
	price: number
	parts_manufacturer: string
	name: string
	image: string
	in_stock: number
	count: number
	total_price: number
	createdAt: string
	updatedAt: string
}

export interface IAddToCartFx {
	url: string
	username: string
	partId: number
}

export interface IUpdateCartItemFx {
	url: string
	payload: {
		total_price?: number
		count?: number
	}
}

export interface ICartItemCounterProps {
	totalCount: number
	partId: number
	initialCount: number
	increasePrice: VoidFunction
	decrasePrice: VoidFunction
	priceOne: number
}
