import { Event } from 'effector'

export interface IManufacturersBlockProps {
	title: string
	manufacturersList: IFilterCheckBoxItem[]
	event: Event<IFilterCheckBoxItem>
}

export interface IManufacturersBlockItemProps {
	item: IFilterCheckBoxItem
	event: Event<IFilterCheckBoxItem>
}

export interface IQueryParams {
	offset: string
	first: string
	boiler: string
	parts: string
	priceFrom: string
	priceTo: string
	partId: string
}

export interface IFilterCheckBoxItem {
	title: string
	checked: boolean
	id?: string
	event: Event<IFilterCheckBoxItem>
}

export interface IFilterManufacturersAccordionProps {
	manufacturersList: IFilterCheckBoxItem[]
	title: string | false
	setManufacturer: Event<IFilterCheckBoxItem[]>
	updateManufacturer: Event<IFilterCheckBoxItem>
}

export interface ICatalogBaseTypes {
	priceRange: number[]
	setPriceRange: (arg0: number[]) => void
	setIsPriceRangeChanged: (arg0: boolean) => void
}

export interface ICatalogFiltersBaseTypes {
	resetFilterBtnDisabled: boolean
	resetFilters: VoidFunction
}

export interface ICatalogFilterProps
	extends ICatalogBaseTypes,
	ICatalogFiltersBaseTypes {
	isPriceRangeChanged: boolean
	currentPage: number
	setIsFilterInQuery: (arg0: boolean) => void
	closePopup: VoidFunction
	filterMobileOpen: boolean
}

export type IPriceRangeProps = ICatalogBaseTypes

export interface ICatalogFilterDesktopProps
	extends ICatalogBaseTypes,
	ICatalogFiltersBaseTypes {
	spinner: boolean
	applayFilters: VoidFunction
}

export interface ICatalogFilterMobileProps
	extends ICatalogBaseTypes,
	ICatalogFiltersBaseTypes {
	spinner: boolean
	applayFilters: VoidFunction
	closePopup: VoidFunction
	filterMobileOpen: boolean
}

export interface IFiltersPopupTop extends ICatalogFiltersBaseTypes {
	resetBtnText: string
	title: string
	closePopup: VoidFunction
}

export interface IFilterPopupProps extends IFilterManufacturersAccordionProps {
	resetFilterBtnDisabled: boolean
	resetAllManufacturers: VoidFunction
	handleClosePopup: VoidFunction
	applayFilters: VoidFunction
	openPopup: boolean
}
