import { CURRENCY_SYMBOLS_OPTIONS } from 'src/app/core/constants/currencies';

const _defaultProductCountWords = ['объявление', 'объявления', 'объявлений'];

export const getCurrencySymbol = (id) => {
	return CURRENCY_SYMBOLS_OPTIONS.filter((symbol) => symbol.id === id).map(
		(symbol) => symbol.name
	)[0];
};

export const getPrice = (product, price) =>
	price + ' ' + getCurrencySymbol(product.currency);

export const getCountText = (number) => {
	const cases = [2, 0, 1, 1, 1, 2];
	return (
		number +
		' ' +
		_defaultProductCountWords[
			number % 100 > 4 && number % 100 < 20
				? 2
				: cases[Math.min(number % 10, 5)]
		]
	);
};
