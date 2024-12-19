import { useMediaQuery } from '@/hooks/useMediaQuery'
import { CatalogFiltersDesktop } from './CatalogFiltersDesktop'
import { ICatalogFilterProps } from '@/types/catalog'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
	$boilerManufacturers,
	$partsManufacturers,
	setFilteredBoilerParts,
	setBoilerManufacturersFromQuery,
	setPartsManufacturersFromQuery,
} from '@/context/boilerParts'
import { useUnit } from 'effector-react'
import { useRouter } from 'next/router'
import { getBoilerPartsFx } from '@/app/api/boilerParts'
import { getQueryParamOnFirstRender } from '@/utils/common'
import { CatalogFiltersMobile } from './CatalogFiltersMobile'
import { checkQueryParams } from '@/utils/catalog'

export const CatalogFilters = ({
	priceRange,
	setPriceRange,
	setIsPriceRangeChanged,
	resetFilterBtnDisabled,
	resetFilters,
	isPriceRangeChanged,
	currentPage,
	setIsFilterInQuery,
	closePopup,
	filterMobileOpen,
}: ICatalogFilterProps): JSX.Element => {
	const isMobile = useMediaQuery(820)
	const [spinner, setSpinner] = useState<boolean>(false)
	const boilerManufacturers = useUnit($boilerManufacturers)
	const partsManufacturers = useUnit($partsManufacturers)
	const router = useRouter()
	const attachSetFilteredBoilerParts = useUnit(setFilteredBoilerParts)
	const attachSetBoilerManufacturersFromQuery = useUnit(
		setBoilerManufacturersFromQuery
	)
	const attachSetPartsManufacturersFromQuery = useUnit(
		setPartsManufacturersFromQuery
	)

	useEffect(() => {
		applayFiltersFromQuery()
	}, [])

	const applayFiltersFromQuery = async () => {
		try {
			const {
				isValidBoilerQuery,
				isValidPartsQuery,
				isValidPriceQuery,
				priceFromQueryValue,
				priceToQueryValue,
				boilerQueryValue,
				partsQueryValue,
			} = checkQueryParams(router)
			const boilerQuery = `&boiler=${getQueryParamOnFirstRender('boiler', router)}`
			const partsQuery = `&parts=${getQueryParamOnFirstRender('parts', router)}`
			const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`
			if (isValidBoilerQuery && isValidPartsQuery && isValidPriceQuery) {
				updateParamsAndFiltersFromQuery(() => {
					updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
					attachSetBoilerManufacturersFromQuery(boilerQueryValue)
					attachSetPartsManufacturersFromQuery(partsQueryValue)
				}, `${currentPage}${priceQuery}${boilerQuery}${partsQuery}`)
				return
			}
			if (isValidBoilerQuery && isValidPriceQuery) {
				updateParamsAndFiltersFromQuery(() => {
					updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
					attachSetBoilerManufacturersFromQuery(boilerQueryValue)
				}, `${currentPage}${priceQuery}${boilerQuery}`)
				return
			}
			if (isValidPartsQuery && isValidPriceQuery) {
				updateParamsAndFiltersFromQuery(() => {
					updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
					attachSetPartsManufacturersFromQuery(partsQueryValue)
				}, `${currentPage}${priceQuery}${partsQuery}`)
				return
			}
			if (isValidPriceQuery) {
				updateParamsAndFiltersFromQuery(() => {
					updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
				}, `${currentPage}${priceQuery}`)
				return
			}
			if (isValidBoilerQuery && isValidPartsQuery) {
				updateParamsAndFiltersFromQuery(() => {
					setIsFilterInQuery(true)
					attachSetBoilerManufacturersFromQuery(boilerQueryValue)
					attachSetPartsManufacturersFromQuery(partsQueryValue)
				}, `${currentPage}${boilerQuery}${partsQuery}`)
				return
			}
			if (isValidBoilerQuery) {
				updateParamsAndFiltersFromQuery(() => {
					setIsFilterInQuery(true)
					attachSetBoilerManufacturersFromQuery(boilerQueryValue)
				}, `${currentPage}${boilerQuery}`)
				return
			}
			if (isValidPartsQuery) {
				updateParamsAndFiltersFromQuery(() => {
					setIsFilterInQuery(true)
					attachSetPartsManufacturersFromQuery(partsQueryValue)
				}, `${currentPage}${partsQuery}`)
				return
			}
		} catch (error) {
			const err = error as Error
			if (err.message === 'URI malformed') {
				toast.warning('Неправильный url для фильтра')
				return
			}
			toast.error(err.message)
		}
	}

	const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
		setIsFilterInQuery(true)
		setPriceRange([+priceFrom, +priceTo])
		setIsPriceRangeChanged(true)
	}

	const updateParamsAndFiltersFromQuery = async (
		callback: VoidFunction,
		path: string
	) => {
		callback()
		const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`)
		attachSetFilteredBoilerParts(data)
	}

	async function updateParamsAndFilters<T>(updatedParams: T, path: string) {
		const params = router.query

		delete params.boiler
		delete params.parts
		delete params.priceFrom
		delete params.priceTo

		router.push(
			{
				query: {
					...params,
					...updatedParams,
				},
			},
			undefined,
			{ shallow: true }
		)
		const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`)
		attachSetFilteredBoilerParts(data)
	}

	const applayFilters = async () => {
		setIsFilterInQuery(true)
		try {
			setSpinner(true)
			const priceFrom = Math.ceil(priceRange[0])
			const priceTo = Math.ceil(priceRange[1])
			const priceQuery = isPriceRangeChanged
				? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
				: ''
			const boiler = boilerManufacturers
				.filter((item) => item.checked === true)
				.map((item) => item.title)
			const parts = partsManufacturers
				.filter((item) => item.checked === true)
				.map((item) => item.title)
			const enCodedBoilerQuery = encodeURIComponent(JSON.stringify(boiler))
			const enCodedPartsQuery = encodeURIComponent(JSON.stringify(parts))
			const boilerQuery = `&boiler=${enCodedBoilerQuery}`
			const partsQuery = `&parts=${enCodedPartsQuery}`
			const initialPage = currentPage > 0 ? 0 : currentPage

			if (boiler.length && parts.length && isPriceRangeChanged) {
				updateParamsAndFilters(
					{
						boiler: enCodedBoilerQuery,
						parts: enCodedPartsQuery,
						priceFrom,
						priceTo,
						offset: initialPage + 1,
					},
					`${initialPage}${priceQuery}${boilerQuery}${partsQuery}`
				)
				return
			}
			if (isPriceRangeChanged && boiler.length) {
				updateParamsAndFilters(
					{
						boiler: enCodedBoilerQuery,
						priceFrom,
						priceTo,
						offset: initialPage + 1,
					},
					`${initialPage}${priceQuery}${boilerQuery}`
				)
				return
			}
			if (isPriceRangeChanged && parts.length) {
				updateParamsAndFilters(
					{
						parts: enCodedPartsQuery,
						priceFrom,
						priceTo,
						offset: initialPage + 1,
					},
					`${initialPage}${priceQuery}${partsQuery}`
				)
				return
			}
			if (boiler.length && parts.length) {
				updateParamsAndFilters(
					{
						boiler: enCodedBoilerQuery,
						parts: enCodedPartsQuery,
						offset: initialPage + 1,
					},
					`${initialPage}${boilerQuery}${partsQuery}`
				)
				return
			}
			if (isPriceRangeChanged) {
				updateParamsAndFilters(
					{
						priceFrom,
						priceTo,
						offset: initialPage + 1,
					},
					`${initialPage}${priceQuery}`
				)
				return
			}
			if (boiler.length) {
				updateParamsAndFilters(
					{
						boiler: enCodedBoilerQuery,
						offset: initialPage + 1,
					},
					`${initialPage}${boilerQuery}`
				)
				return
			}
			if (parts.length) {
				updateParamsAndFilters(
					{
						parts: enCodedPartsQuery,
						offset: initialPage + 1,
					},
					`${initialPage}${partsQuery}`
				)
				return
			}
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}

	return (
		<>
			{isMobile ? (
				<CatalogFiltersMobile
					priceRange={priceRange}
					setPriceRange={setPriceRange}
					setIsPriceRangeChanged={setIsPriceRangeChanged}
					spinner={spinner}
					applayFilters={applayFilters}
					resetFilterBtnDisabled={resetFilterBtnDisabled}
					resetFilters={resetFilters}
					closePopup={closePopup}
					filterMobileOpen={filterMobileOpen}
				/>
			) : (
				<CatalogFiltersDesktop
					priceRange={priceRange}
					setPriceRange={setPriceRange}
					setIsPriceRangeChanged={setIsPriceRangeChanged}
					resetFilterBtnDisabled={resetFilterBtnDisabled}
					spinner={spinner}
					resetFilters={resetFilters}
					applayFilters={applayFilters}
				/>
			)}
		</>
	)
}
