import Select from 'react-select'
import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { IOption, SelectOptionType } from '@/types/common'
import { optionStyles } from '@/styles/searchInput'
import { createSelectOption } from '@/utils/common'
import {
	selectStyles,
	controlStyles,
	menuStyles,
} from '@/styles/catalog/select'
import { categoryOptions } from '@/utils/selectContents'
import {
	$boilerParts,
	setBoilerPartsByPopularity,
	setBoilerPartsCheapFirst,
	setBoilerPartsExpensiveFirst,
} from '@/context/boilerParts'
import { useRouter } from 'next/router'

export const FilterSelect = ({
	setSpinner,
}: {
	setSpinner: (arg0: boolean) => void
}): JSX.Element => {
	const mode = useUnit($mode)
	const boilerParts = useUnit($boilerParts)
	const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)
	const attachBoilerPartsCheapFirst = useUnit(setBoilerPartsCheapFirst)
	const attachBoilerPartsExpensiveFirst = useUnit(setBoilerPartsExpensiveFirst)
	const attachBoilerPartsByPopularity = useUnit(setBoilerPartsByPopularity)
	const router = useRouter()

	useEffect(() => {
		if (boilerParts.rows) {
			switch (router.query.first) {
				case 'cheap':
					updateCategoryOption('Сначала дешевые')
					attachBoilerPartsCheapFirst()
					break
				case 'expensive':
					updateCategoryOption('Сначала дорогие')
					attachBoilerPartsExpensiveFirst()
					break
				case 'popularity':
					updateCategoryOption('По популярности')
					attachBoilerPartsByPopularity()
					break
				default:
					updateCategoryOption('Сначала дешевые')
					attachBoilerPartsCheapFirst()
					break
			}
		}
	}, [boilerParts.rows, router.query.first])

	const updateCategoryOption = (value: string) =>
		setCategoryOption({ value, label: value })

	const updateRouteParam = (first: string) =>
		router.push(
			{
				query: {
					...router.query,
					first,
				},
			},
			undefined,
			{ shallow: true }
		)

	const heandleSortOptionChange = (selectOption: SelectOptionType) => {
		setSpinner(true)
		setCategoryOption(selectOption)

		switch ((selectOption as IOption).value) {
			case 'Сначала дешевые':
				attachBoilerPartsCheapFirst()
				updateRouteParam('cheap')
				break
			case 'Сначала дорогие':
				attachBoilerPartsExpensiveFirst()
				updateRouteParam('expensive')
				break
			case 'По популярности':
				attachBoilerPartsByPopularity()
				updateRouteParam('popularity')
				break
			default:
				break
		}

		setTimeout(() => setSpinner(false), 1000)
	}

	return (
		<Select
			placeholder="Я ищу..."
			value={categoryOption || createSelectOption('Сначала дешевые')}
			onChange={heandleSortOptionChange}
			styles={{
				...selectStyles,
				control: (defaultStyles) => ({
					...controlStyles(defaultStyles, mode),
				}),
				input: (defaultStyles) => ({
					...defaultStyles,
					color: mode === 'dark' ? '#f2f2f2' : '#222222',
				}),
				menu: (defaultStyles) => ({
					...menuStyles(defaultStyles, mode),
				}),
				option: (defaultValue, state) => ({
					...optionStyles(defaultValue, mode, state),
				}),
			}}
			isSearchable={false}
			options={categoryOptions}
		/>
	)
}
