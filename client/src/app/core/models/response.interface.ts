export interface ApiSuccessResponse<T> {
	data: T[] | T;
	success: boolean;
}
