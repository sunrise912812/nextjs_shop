import styles from '@/styles/catalog/index.module.scss'
import cn from 'classnames'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import { AnimatePresence } from 'framer-motion'
import { ManufacturersBlock } from '@/components/modules/CatalogPage/ManufacturersBlock'
import { FilterSelect } from '@/components/modules/CatalogPage/FilterSelect'
import { getBoilerPartsFx } from '@/app/api/boilerParts'
import { $boilerParts, setBoilerParts } from '@/context/boilerParts'
import { toast } from 'react-toastify'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import { useEffect, useState } from 'react'
import { CatalogItem } from '@/components/modules/CatalogPage/CatalogItem'
import ReactPaginate from 'react-paginate'
import { IQueryParams } from '@/types/catalog'
import { useRouter } from 'next/router'
import { IBoilerParts } from '@/types/boilerparts'
import { CatalogFilters } from '@/components/modules/CatalogPage/CatalogFilters'
import {
	$boilerManufacturers,
	$partsManufacturers,
	updateBoilerManufacturer,
	updatePartsManufacturer,
	setBoilerManufacturers,
	setPartsManufacturers,
	$filteredBoilerParts,
} from '@/context/boilerParts'
import { usePopup } from '@/hooks/usePopup'
import { checkQueryParams } from '@/utils/catalog'
import { FilterSVG } from '@/components/elements/FilterSVG/FilterSVG'

const CatalogPage = ({ query }: { query: IQueryParams }): JSX.Element => {
	const attachBoilerParts = useUnit(setBoilerParts)
	const mode = useUnit($mode)
	const boilerManufacturers = useUnit($boilerManufacturers)
	const partsManufacturers = useUnit($partsManufacturers)
	const filteredBoilerParts = useUnit($filteredBoilerParts)
	const boilerParts = useUnit($boilerParts)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const darkModeClassSkeleton =
		mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
	const [spinner, setSpinner] = useState<boolean>(false)
	const [priceRange, setPriceRange] = useState<number[]>([1000, 49000])
	const [isPriceRangeChanged, setIsPriceRangeChanged] = useState<boolean>(false)
	const [isFilterInQuery, setIsFilterInQuery] = useState<boolean>(false)
	const pagesCount = Math.ceil(boilerParts.count / 20)
	const isValidOffset =
		query.offset && !isNaN(+query.offset) && +query.offset > 0
	const [currentPage, setCurrentPage] = useState(
		isValidOffset ? +query.offset - 1 : 0
	)
	const router = useRouter()

	const attachUpdateBoilerManufacturer = useUnit(updateBoilerManufacturer)
	const attachUpdatePartsManufacturer = useUnit(updatePartsManufacturer)
	const attachSetBoilerManufacturer = useUnit(setBoilerManufacturers)
	const attachSetPartsManufacturer = useUnit(setPartsManufacturers)

	const isAnyBoilerManufacturerChecked = boilerManufacturers.some(
		(item) => item.checked
	)
	const isAnyPartsManufacturerChecked = partsManufacturers.some(
		(item) => item.checked
	)

	const { togleOpen, open, closePopup } = usePopup()

	const resetFilterBtnDisabled = !(
		isPriceRangeChanged ||
		isAnyBoilerManufacturerChecked ||
		isAnyPartsManufacturerChecked
	)

	const resetFilters = async () => {
		try {
			const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')
			const params = router.query

			delete params.boiler
			delete params.parts
			delete params.priceFrom
			delete params.priceTo
			params.first = 'cheap'

			router.push({ query: { ...params } }, undefined, { shallow: true })

			attachSetBoilerManufacturer(
				boilerManufacturers.map((item) => ({ ...item, checked: false }))
			)
			attachSetPartsManufacturer(
				partsManufacturers.map((item) => ({ ...item, checked: false }))
			)
			attachBoilerParts(data)
			setPriceRange([1000, 49000])
			setIsPriceRangeChanged(false)
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	useEffect(() => {
		loadBoilerParts()
	}, [filteredBoilerParts, isFilterInQuery])

	const loadBoilerParts = async () => {
		try {
			setSpinner(true)
			const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')
			if (!isValidOffset) {
				router.replace({ query: { offset: 1 } })
				resetPagination(data)
				return
			}
			if (isValidOffset) {
				if (+query.offset > Math.ceil(data.count / 20)) {
					router.push(
						{
							query: {
								...query,
								offset: 1,
							},
						},
						undefined,
						{ shallow: true }
					)

					setCurrentPage(0)
					attachBoilerParts(isFilterInQuery ? filteredBoilerParts : data)
					return
				}
				const offset = +query.offset - 1
				const result = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${offset}`
				)
				setCurrentPage(offset)
				attachBoilerParts(isFilterInQuery ? filteredBoilerParts : result)
				return
			}
			setCurrentPage(0)
			attachBoilerParts(isFilterInQuery ? filteredBoilerParts : data)
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setTimeout(() => setSpinner(false), 1000)
		}
	}

	const resetPagination = (data: IBoilerParts) => {
		setCurrentPage(0)
		attachBoilerParts(data)
	}

	const handlePageChange = async ({ selected }: { selected: number }) => {
		try {
			setSpinner(true)
			const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')
			if (selected > pagesCount) {
				resetPagination(isFilterInQuery ? filteredBoilerParts : data)
				return
			}
			if (isValidOffset && +query.offset > Math.ceil(data.count / 20)) {
				resetPagination(isFilterInQuery ? filteredBoilerParts : data)
			}

			const { isValidBoilerQuery, isValidPartsQuery, isValidPriceQuery } =
				checkQueryParams(router)

			const result = await getBoilerPartsFx(
				`/boiler-parts?limit=20&offset=${selected}${isFilterInQuery && isValidBoilerQuery
					? `&boiler=${router.query.boiler}`
					: ''
				}${isFilterInQuery && isValidPartsQuery
					? `&parts=${router.query.parts}`
					: ''
				}${isFilterInQuery && isValidPriceQuery
					? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
					: ''
				}`
			)
			router.push(
				{
					query: {
						...router.query,
						offset: selected + 1,
					},
				},
				undefined,
				{ shallow: true }
			)
			setCurrentPage(selected)
			attachBoilerParts(result)
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setTimeout(() => setSpinner(false), 1000)
		}
	}

	return (
		<section className={styles.catalog}>
			<div className={cn('container', styles.catalog__container)}>
				<h2 className={cn(styles.catalog__title, darkModeClass)}>
					Каталог товаров
				</h2>
				<div className={cn(styles.catalog__top, darkModeClass)}>
					<AnimatePresence>
						{isAnyBoilerManufacturerChecked && (
							<ManufacturersBlock
								title="Производитель котлов:"
								event={attachUpdateBoilerManufacturer}
								manufacturersList={boilerManufacturers}
							/>
						)}
					</AnimatePresence>
					<AnimatePresence>
						{isAnyPartsManufacturerChecked && (
							<ManufacturersBlock
								title="Производитель запчастей:"
								event={attachUpdatePartsManufacturer}
								manufacturersList={partsManufacturers}
							/>
						)}
					</AnimatePresence>
					<div className={styles.catalog__top__inner}>
						<button
							className={cn(styles.catalog__top__reset, darkModeClass)}
							disabled={resetFilterBtnDisabled}
							onClick={resetFilters}
						>
							Сбросить фильтр
						</button>
						<button className={styles.catalog__top__mobile_btn} onClick={togleOpen}>
							<span className={styles.catalog__top__mobile_btn__svg}><FilterSVG /></span>
							<span className={styles.catalog__top__mobile_btn__text}>Фильтр</span>
						</button>
						<FilterSelect setSpinner={setSpinner} />
					</div>
				</div>
				<div className={styles.catalog__bottom}>
					<div className={styles.catalog__bottom__inner}>
						<CatalogFilters
							priceRange={priceRange}
							setPriceRange={setPriceRange}
							setIsPriceRangeChanged={setIsPriceRangeChanged}
							resetFilterBtnDisabled={resetFilterBtnDisabled}
							resetFilters={resetFilters}
							isPriceRangeChanged={isPriceRangeChanged}
							currentPage={currentPage}
							setIsFilterInQuery={setIsFilterInQuery}
							closePopup={closePopup}
							filterMobileOpen={open}
						/>
						{spinner ? (
							<ul className={skeletonStyles.skeleton}>
								{Array.from(new Array(20)).map((_, i) => (
									<li
										key={i}
										className={cn(
											skeletonStyles.skeleton__item,
											darkModeClassSkeleton
										)}
									>
										<div className={skeletonStyles.skeleton__item__light} />
									</li>
								))}
							</ul>
						) : (
							<ul className={styles.catalog__list}>
								{boilerParts.rows?.length ? (
									boilerParts.rows.map((item) => (
										<CatalogItem item={item} key={item.id} />
									))
								) : (
									<span>Список товаров пуст...</span>
								)}
							</ul>
						)}
					</div>
					<ReactPaginate
						containerClassName={styles.catalog__bottom__list}
						pageClassName={styles.catalog__bottom__list__item}
						pageLinkClassName={styles.catalog__bottom__list__item__link}
						previousClassName={styles.catalog__bottom__list__prev}
						nextClassName={styles.catalog__bottom__list__next}
						breakClassName={styles.catalog__bottom__list__break}
						breakLinkClassName={cn(
							styles.catalog__bottom__list__break__link,
							darkModeClass
						)}
						breakLabel="..."
						pageCount={pagesCount}
						forcePage={currentPage}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>
		</section>
	)
}

export default CatalogPage
