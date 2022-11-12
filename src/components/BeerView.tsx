import { BeerStyle } from '../types';
import { BeerCard } from './BeerCard';
import Beer from './classes/Beer';
import Brewery from './classes/Brewery';

export const BeerView = () => {
	const testBrewery = new Brewery('Lagunitas Brewing Co.');
	testBrewery.location = 'Petaluma, CA';

	const testBeer = new Beer('Lagunitas IPA', testBrewery);
	testBeer.style = BeerStyle.INDIA_PALE_ALE;
	testBeer.abv = 5.5;
	testBeer.ibu = 6.5;
	testBeer.imageURL =
		'https://static.specsonline.com/wp-content/uploads/2022/01/lagunitas.jpg';

	return (
		<div className="container mt-5">
			<BeerCard beer={testBeer} />
		</div>
	);
};
