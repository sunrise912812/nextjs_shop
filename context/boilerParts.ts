import { createDomain } from 'effector'
import { IBoilerParts } from '@/types/boilerparts'
import { IFilterCheckBoxItem } from '@/types/catalog'
import { boilerManufacturers, partsManufacturers } from '@/utils/catalog'

const boilerParts = createDomain()

export const setBoilerParts = boilerParts.createEvent<IBoilerParts>()
export const setBoilerPartsCheapFirst = boilerParts.createEvent()
export const setBoilerPartsExpensiveFirst = boilerParts.createEvent()
export const setBoilerPartsByPopularity = boilerParts.createEvent()
export const setFilteredBoilerParts = boilerParts.createEvent<IBoilerParts>()

export const setBoilerManufacturers =
	boilerParts.createEvent<IFilterCheckBoxItem[]>()
export const updateBoilerManufacturer =
	boilerParts.createEvent<IFilterCheckBoxItem>()
export const setPartsManufacturers =
	boilerParts.createEvent<IFilterCheckBoxItem[]>()
export const updatePartsManufacturer =
	boilerParts.createEvent<IFilterCheckBoxItem>()
export const setBoilerManufacturersFromQuery =
	boilerParts.createEvent<string[]>()
export const setPartsManufacturersFromQuery =
	boilerParts.createEvent<string[]>()

const updateManufacturer = (
	manufacturer: IFilterCheckBoxItem[],
	id: string,
	payload: Partial<IFilterCheckBoxItem> //Partial - Создает тип со всеми свойствами Type, установленными как необязательные. Эта утилита вернет тип, представляющий все подмножества данного типа.
) =>
	manufacturer.map((item) => {
		if (item.id === id) {
			return {
				...item,
				...payload,
			}
		}
		return item
	})

const updateManufacturerFromQuery = (
	manufacturer: IFilterCheckBoxItem[],
	manufacturerFromQuery: string[]
) =>
	manufacturer.map((item) => {
		if (manufacturerFromQuery.find((title) => title === item.title)) {
			return {
				...item,
				checked: true,
			}
		}
		return item
	})

export const $boilerParts = boilerParts
	.createStore<IBoilerParts>({} as IBoilerParts)
	.on(setBoilerParts, (_, boilerParts) => boilerParts)
	.on(setBoilerPartsCheapFirst, (state) => ({
		...state,
		rows: state.rows.sort((a, b) => a.price - b.price), //Сначала дешевые
	}))
	.on(setBoilerPartsExpensiveFirst, (state) => ({
		...state,
		rows: state.rows.sort((a, b) => b.price - a.price), //Сначала дорогие
	}))
	.on(setBoilerPartsByPopularity, (state) => ({
		...state,
		rows: state.rows.sort((a, b) => b.popularity - a.popularity), //Сначала популярные
	}))

export const $boilerManufacturers = boilerParts
	.createStore<IFilterCheckBoxItem[]>(
		boilerManufacturers as IFilterCheckBoxItem[]
	)
	.on(setBoilerManufacturers, (_, parts) => parts)
	.on(updateBoilerManufacturer, (state, payload) => [
		...updateManufacturer(state, payload.id as string, {
			checked: payload.checked, //payload - измененые значения
		}),
	])
	.on(setBoilerManufacturersFromQuery, (state, manufacturerFromQuery) => [
		...updateManufacturerFromQuery(state, manufacturerFromQuery),
	])

export const $partsManufacturers = boilerParts
	.createStore<IFilterCheckBoxItem[]>(
		partsManufacturers as IFilterCheckBoxItem[]
	)
	.on(setPartsManufacturers, (_, parts) => parts)
	.on(updatePartsManufacturer, (state, payload) => [
		...updateManufacturer(state, payload.id as string, {
			checked: payload.checked, //payload - измененые значения
		}),
	])
	.on(setPartsManufacturersFromQuery, (state, manufacturerFromQuery) => [
		...updateManufacturerFromQuery(state, manufacturerFromQuery),
	])

export const $filteredBoilerParts = boilerParts
	.createStore<IBoilerParts>({} as IBoilerParts)
	.on(setFilteredBoilerParts, (_, boilerParts) => boilerParts)
