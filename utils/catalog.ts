import { idGenerator } from './common'
import { NextRouter } from 'next/router'
import { getQueryParamOnFirstRender } from '@/utils/common'

const createManufacturerCheckboxObj = (title: string) => ({
	title,
	checked: false,
	id: idGenerator(),
})

//Создадим массив с производителями котлов
export const boilerManufacturers = [
	'Electrolux',
	'Ariston',
	'Zanussi',
	'Eldom',
	'Atlantic',
	'Gorenje',
	'Klima Hitze',
	'Roda',
].map(createManufacturerCheckboxObj)

//Создадим массив с производителями запчестей
export const partsManufacturers = [
	'Azure',
	'Gloves',
	'Cambridgeshire',
	'Salmon',
	'Montana',
	'Sensor',
	'Lesly',
	'Radian',
	'Gasoline',
	'Croatia',
].map(createManufacturerCheckboxObj)

const checkPriceFromQuery = (price: number) =>
	price && !isNaN(price) && price >= 0 && price <= 50000

export const checkQueryParams = (router: NextRouter) => {
	const priceFromQueryValue = getQueryParamOnFirstRender(
		'priceFrom',
		router
	) as string
	const priceToQueryValue = getQueryParamOnFirstRender(
		'priceTo',
		router
	) as string

	const boilerQueryValue = JSON.parse(
		decodeURIComponent(getQueryParamOnFirstRender('boiler', router) as string)
	)
	const partsQueryValue = JSON.parse(
		decodeURIComponent(getQueryParamOnFirstRender('parts', router) as string)
	)
	const isValidBoilerQuery =
		Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length
	const isValidPartsQuery =
		Array.isArray(partsQueryValue) && !!partsQueryValue?.length
	const isValidPriceQuery =
		checkPriceFromQuery(+priceFromQueryValue) &&
		checkPriceFromQuery(+priceToQueryValue)

	return {
		isValidBoilerQuery,
		isValidPartsQuery,
		isValidPriceQuery,
		priceFromQueryValue,
		priceToQueryValue,
		boilerQueryValue,
		partsQueryValue,
	}
}
