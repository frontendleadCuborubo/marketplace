export interface GenderOptions {
	id: string;
	name: string;
}

export enum Genders {
	M = 'M',
	F = 'F',
}

export const GENDERS_OPTIONS: GenderOptions[] = [
	{
		id: Genders.M,
		name: 'Мужчина',
	},
	{
		id: Genders.F,
		name: 'Женщина',
	},
];
