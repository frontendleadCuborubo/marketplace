export interface SortOrdersOptions {
	title: string;
	value: string;
}

export const getDefaultSortValue = () => '-updatedAt';

export const getAvailableOrders = (): SortOrdersOptions[] => [
	{
		title: 'По дате',
		value: '-updatedAt',
	},
	{
		title: 'Дешевые',
		value: 'price',
	},
	{
		title: 'Дорогие',
		value: '-price',
	},
];
