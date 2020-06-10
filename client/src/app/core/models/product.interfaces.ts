import { IUser } from './user.interfaces';

export interface IProduct {
	_id: string;
	title: string;
	description: string;
	price: string;
	currency: number;
	status: number;
	category?: string;
	user: IUser;
}
