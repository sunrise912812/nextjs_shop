export interface IBoilerPart {
	id: number
	boiler_manufacturer: string
	price: number
	parts_manufacturer: string
	vender_code: string
	name: string
	description: string
	images: string
	in_stock: number
	bestsellers: boolean
	new: boolean
	popularity: number
	compatibility: string
	createdAt: string
	updatedAt: string
}

export interface IBoilerParts {
	count: number
	rows: IBoilerPart[]
}