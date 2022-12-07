export const BEER_STYLES = [
	'Pale Lager',
	'Dark Lager',
	'Brown Ale',
	'Pilsner',
	'Pale Ale',
	'India Pale Ale',
	'Porter',
	'Stout',
	'Belgian-Style Ale',
	'Wheat',
	'Sour',
	'Specialty',
];

export enum BeerCharacteristic {
	SWEET = 'Sweet',
	FRUITY = 'Fruity',
	BUTTERY = 'Buttery',
	SPICY = 'Spicy',
	FLORAL = 'Floral',
	HOPPY = 'Hoppy',
	BITTER = 'Bitter',
}

export interface BeerParams {
	beername: string;
	breweryname: string;
	beerstyle?: string;
	abv?: number;
	ibu?: number;
	img?: string;
	rating?:number
}
