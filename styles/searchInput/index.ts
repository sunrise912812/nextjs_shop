import { IOption } from '@/types/common'
import {
	CSSObjectWithLabel,
	GroupBase,
	OptionProps,
	StylesConfig,
} from 'react-select'

export const controlStyles = (
	defaultStyles: CSSObjectWithLabel,
	theme: string
) => ({
	...defaultStyles,
	cursor: 'pointer',
	backgroundColor: 'transparent',
	border: '1px solid #9e9e9e',
	height: '40px',
	boxShadow: 'none',
	borderRadius: '4px',
	'&:hover': {
		borderColor: '#9e9e9e',
	},
	'& .css-1dim5e-singleValue': {
		//Если есть элемент с таким классом то будем менять цвет в зависимости от темы
		color: theme === 'dark' ? '#f2f2f2' : '#222222',
	},
	borderRight: 'none',
	borderTopRightRadius: 0,
	borderBottomRightRadius: 0,
})

export const menuStyles = (
	defaultStyles: CSSObjectWithLabel,
	theme: string
) => ({
	...defaultStyles,
	boxShadow: 'none',
	borderRadius: '4px',
	border: 'none',
	borderTopRightRadius: 0,
	borderTopLeftRadius: 0,
	height: 'auto',
	overflow: 'hidden',
	backgroundColor: theme === 'dark' ? '#2d2d2d2' : '#ffffff',
	width: 'calc(100% + 40px)',
	minHeight: '30px',
})

export const optionStyles = (
	defaultStyles: CSSObjectWithLabel,
	theme: string,
	state: OptionProps<IOption, boolean, GroupBase<IOption>>
) => {
	const backgroundColorForLightMode = state.isSelected
		? state.isSelected
			? '#9e9e9e'
			: '#f2f2f2'
		: state.isSelected
			? '#f2f2f2'
			: '#9e9e9e'

	const backgroundColorForDarktMode = state.isSelected
		? state.isSelected
			? '#f2f2f2'
			: '#9e9e9e'
		: state.isSelected
			? '#9e9e9e'
			: '#f2f2f2'

	const colorHoverForLightMode = state.isSelected
		? state.isSelected
			? '#f2f2f2'
			: '#9e9e9e'
		: state.isSelected
			? '#9e9e9e'
			: '#f2f2f2'

	const colorHoverForDarkMode = state.isSelected
		? state.isSelected
			? '#9e9e9e'
			: '#f2f2f2'
		: state.isSelected
			? '#f2f2f2'
			: '#9e9e9e'

	return {
		...defaultStyles,
		cursor: 'pointer',
		padding: '6px 12px',
		margin: 0,
		'&:hover': {
			backgroundColor:
				theme === 'dark'
					? backgroundColorForDarktMode
					: backgroundColorForLightMode,
			color: theme === 'dark' ? colorHoverForDarkMode : colorHoverForLightMode,
		},
		backgroundColor:
			theme === 'dark'
				? state.isSelected
					? '#ffffff'
					: '#2d2d2d'
				: state.isSelected
					? '#2d2d2d'
					: '#ffffff',
		color:
			theme === 'dark'
				? state.isSelected
					? '#222222'
					: '#f2f2f2'
				: state.isSelected
					? '#f2f2f2'
					: '#222222',
	}
}

export const inputStyles: StylesConfig<IOption, boolean, GroupBase<IOption>> = {
	control: () => ({}),
	indicatorSeparator: () => ({
		border: 'none',
	}),
	dropdownIndicator: () => ({
		display: 'none',
	}),
	menuList: (defaultStyles) => ({
		...defaultStyles,
		paddingTop: 0,
		paddingBottom: 0,
		minHeight: 30,
		'&::-webkit-scrollbar': {
      /*Добавим стили для скролбара*/ width: '8px',
		},
		'&::-webkit-scrollbar-track': {
			backgroundColor: 'transparent' /*Прозрачный фон*/,
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#454545',
			borderRadius: '3px',
		},

		'&::-webkit-scrollbar-thumb:hover': {
			backgroundColor: 'gray',
		},
	}),
	placeholder: (defaultStyles) => ({
		...defaultStyles,
		color: '#b9babb',
	}),
}
