import { useUnit } from 'effector-react'
import { $mode } from '@/context/mode'
import Select from 'react-select'
import { MutableRefObject, useRef, useState } from 'react'
import { IOption, SelectOptionType } from '@/types/common'
import {
	inputStyles,
	controlStyles,
	menuStyles,
	optionStyles,
} from '@/styles/searchInput'
import {
	createSelectOption,
	removeClassNameForOverlayAndBody,
	toogleClassNameForOverlayAndBody,
} from '@/utils/common'
import { $searchInputZIndex, setSearchInputZIndex } from '@/context/header'
import styles from '@/styles/header/index.module.scss'
import cn from 'classnames'
import { SearchSVG } from '../SearchSVG/SearchSVG'
import { useDebounceCallback } from '@/hooks/useDebounceCallback'
import { getPartByNameFx, searchPartFx } from '@/app/api/boilerParts'
import { toast } from 'react-toastify'
import { IBoilerPart } from '@/types/boilerparts'
import { useRouter } from 'next/router'
import {
	NoOptionsMessage,
	NoOptionsSpinner,
} from '../SelectOptionsMessage/SelectOptionsMessage'

export const SearchInput = (): JSX.Element => {
	const mode = useUnit($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
	const zIndex = useUnit($searchInputZIndex)
	const [searchOption, setSearchOption] = useState<SelectOptionType>(null)
	const attactSetSearchInputZIndex = useUnit(setSearchInputZIndex)
	const [onMenuOpenControlStyles, setOnMenuOpenControlStyles] = useState({})
	const [onMenuOpenContainerStyles, setOnMenuOpenContainerStyles] = useState({})
	const btnRef = useRef() as MutableRefObject<HTMLButtonElement>
	const borderRef = useRef() as MutableRefObject<HTMLSpanElement>
	const delayCallback = useDebounceCallback(1000)
	const [spinner, setSpinner] = useState<boolean>(false)
	const [options, setOptions] = useState([])
	const router = useRouter()
	const [inputValue, setInputValue] = useState('')

	const heandleSearchOptionChange = (selectOption: SelectOptionType) => {
		if (!selectOption) {
			setSearchOption(null)
			return
		}
		const name = (selectOption as IOption)?.value as string

		if (name) {
			getPartAndRedirect(name)
		}

		setSearchOption(selectOption)
		removeClassNameForOverlayAndBody()
	}

	const onFocusSearch = () => {
		toogleClassNameForOverlayAndBody('open-search')
		attactSetSearchInputZIndex(100)
	}

	const handleSearchClick = async () => {
		if (!inputValue) {
			return
		}
		getPartAndRedirect(inputValue)
	}

	const searchPart = async (search: string) => {
		try {
			setInputValue(search)
			setSpinner(true)
			const data = await searchPartFx({
				url: '/boiler-parts/search',
				search,
			})
			const names = data
				.map((item: IBoilerPart) => item.name)
				.map(createSelectOption)

			setOptions(names)
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setSpinner(false)
		}
	}

	const getPartAndRedirect = async (name: string) => {
		const part = await getPartByNameFx({
			url: '/boiler-parts/name',
			name,
		})
		if (!part.id) {
			toast.warning('Товар не найден.')
			return
		}
		router.push(`/catalog/${part.id}`)
	}

	const onSearchInputChange = (text: string) => {
		document.querySelector('.overlay')?.classList.add('open-search')
		document.querySelector('body')?.classList.add('overflow-hidden')
		delayCallback(() => searchPart(text))
	}

	const onSearchMenuOpen = () => {
		setOnMenuOpenControlStyles({
			borderBottomLeftRadius: 0,
			border: 'none',
		})
		setOnMenuOpenContainerStyles({
			boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
		})

		btnRef.current.style.border = 'none'
		btnRef.current.style.borderBottomRightRadius = '0'
		borderRef.current.style.display = 'block'
	}

	const onSearchMenuClose = () => {
		setOnMenuOpenControlStyles({
			borderBottomLeftRadius: '4px',
			boxShadow: 'none',
			border: '1px solid #9e9e9e',
		})
		setOnMenuOpenContainerStyles({
			boxShadow: 'none',
		})

		btnRef.current.style.border = '1px solid #9e9e9e'
		btnRef.current.style.borderLeft = 'none'
		btnRef.current.style.borderBottomRightRadius = '4px'
		borderRef.current.style.display = 'none'
	}

	return (
		<>
			<div className={styles.header__search__inner}>
				<Select
					components={{
						NoOptionsMessage: spinner ? NoOptionsSpinner : NoOptionsMessage,
					}}
					placeholder="Я ищу..."
					value={searchOption}
					onChange={heandleSearchOptionChange}
					onFocus={onFocusSearch}
					onInputChange={onSearchInputChange}
					styles={{
						...inputStyles,
						container: (defaultStyles) => ({
							...defaultStyles,
							...onMenuOpenContainerStyles,
						}),
						control: (defaultStyles) => ({
							...controlStyles(defaultStyles, mode),
							backgroundColor: mode === 'dark' ? '#2d2d2d' : '#ffffff',
							zIndex,
							transition: 'none',
							...onMenuOpenControlStyles,
						}),
						input: (defaultStyles) => ({
							...defaultStyles,
							color: mode === 'dark' ? '#f2f2f2' : '#222222',
						}),
						menu: (defaultStyles) => ({
							...menuStyles(defaultStyles, mode),
							zIndex,
							marginTop: '-1px',
						}),
						option: (defaultValue, state) => ({
							...optionStyles(defaultValue, mode, state),
						}),
					}}
					isClearable={true}
					openMenuOnClick={false}
					onMenuOpen={onSearchMenuOpen}
					onMenuClose={onSearchMenuClose}
					options={options}
				/>
				<span ref={borderRef} className={styles.header__search__border} />
			</div>
			<button
				className={cn(styles.header__search__btn, darkModeClass)}
				ref={btnRef}
				style={{ zIndex }}
				onClick={handleSearchClick}
			>
				<span className={styles.header__search__btn__span}>
					<SearchSVG />
				</span>
			</button>
		</>
	)
}
