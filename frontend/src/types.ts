export enum BeerStyle {
	PALE_LAGER = 'Pale Lager',
	DARK_LAGER = 'Dark Lager',
	BROWN_ALE = 'Brown Ale',
	PILSNER = 'Pilsner',
	PALE_ALE = 'Pale Ale',
	INDIA_PALE_ALE = 'India Pale Ale',
	PORTER = 'Porter',
	STOUT = 'Stout',
	BELGIAN = 'Belgian-Style Ale',
	WHEAT = 'Wheat',
	SOUR = 'Sour',
	SPECIALTY = 'Specialty',
}

export enum BeerCharacteristic {
	SWEET = 'Sweet',
	FRUITY = 'Fruity',
	BUTTERY = 'Buttery',
	SPICY = 'Spicy',
	FLORAL = 'Floral',
	HOPPY = 'Hoppy',
	BITTER = 'Bitter',
}

export interface NewBeerParams {
	name: string;
	breweryID: string;
	style: BeerStyle;
	ibu: number;
	abv: number;
	imgURL: string;
}

export interface NewBreweryParams {
	name: string;
	location: string;
	imgURL: string;
}
