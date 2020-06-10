export interface CurrencySymbolsOptions {
	id: number;
	name: string;
}

export const CURRENCY_SYMBOLS_OPTIONS: CurrencySymbolsOptions[] = [
	{
		id: 1,
		name: 'грн',
	},
	{
		id: 2,
		name: '$',
	},
	{
		id: 3,
		name: '€',
	},
];

export const getCurrencySymbol = (id) => {
	return CURRENCY_SYMBOLS_OPTIONS.filter((symbol) => symbol.id === id).map(
		(symbol) => symbol.name
	)[0];
};
