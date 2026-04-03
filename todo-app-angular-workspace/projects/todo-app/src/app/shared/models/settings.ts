export interface ISettings {
	general: IGeneralSettings;
	search: ISearchSettings;
	pagination: IPaginationSettings;
	theme: IThemeSettings;
}

export interface IGeneralSettings {
	isConfirmEnabled: boolean;
	isPaginationEnabled: boolean;
	isInfiniteScrollEnabled: boolean;
	listSizeType: ListContainerType;
	fixedListSize: number;
}

export interface ISearchSettings {
	isSearchOnKeyPressEnabled: boolean;
	debounceTime: number;
}

export interface IPaginationSettings {
	paginationType: PaginationType;
	maxVisiblePages: number;
}

export enum PaginationType {
	Rotate = 'Rotate',
	Classic = 'Classic'
}

export enum ListContainerType {
	Fixed = 'Fixed',
	Dynamic = 'Dynamic'
}

// Theme related
export interface IThemeSettings {
	backgroundColor: BackgroundColor;
	primaryColor: string; // hex
	bsTheme: BsThemes;
	primaryColorTopCord: number;
	primaryColorLefCord: number;
}

export enum BackgroundColor {
	DarkGray = 'DarkGray',
	DarkBlue = 'DarkBlue',
	DarkRed = 'DarkRed',
	LightGray = 'LightGray',
	LightBlue = 'LightBlue',
	LightRed = 'LightRed'
}

export enum BsThemes {
	Dark = 'dark',
	Light = 'light'
}
