export interface Todo {
	id: number;
	title: string;
	description: string;
	completed: boolean;
	createdAt: Date;
}

export interface Paging {
	totalCount: number;
	activePage: number;
	itemsPerPage: number;
	startIndex: number;
	endIndex: number;
}

export interface TodoList {
	todos: Todo[];
	paging: Paging;
}