import Beer from '../classes/Beer';
import Brewery from '../classes/Brewery';
import BeerBuilder from '../classes/Builder/BeerBuilder';
import BreweryBuilder from '../classes/Builder/BreweryBuilder';
import DB from '../classes/DB';
import AddBeerForm from '../components/AddBeerForm';
import { NewBeerParams, NewBreweryParams } from '../types';

const AddBeerView = () => {
	const db = DB.instance;

	const onSubmit = (
		newBeerParams: NewBeerParams,
		newBreweryParams?: NewBreweryParams
	) => {
		if (newBreweryParams) {
			// Create new Brewery with given parameters
			const newBrewery = generateNewBrewery(newBreweryParams);
			db.addBrewery(newBrewery);

			newBeerParams.breweryID = newBrewery.id;
		}

		// Create new beer
		const newBeer = generateNewBeer(newBeerParams);
		db.addBeer(newBeer);
	};

	return (
		<div className="container section is-max-desktop">
			<nav className="breadcrumb">
				<ul>
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="#">Add Beer</a>
					</li>
				</ul>
			</nav>
			<AddBeerForm onSubmit={onSubmit} />
		</div>
	);
};

const generateNewBrewery = (params: NewBreweryParams): Brewery => {
	const { name, location, imgURL }: NewBreweryParams = params;
	return new BreweryBuilder()
		.reset(name)
		.setLocation(location)
		.setImageURL(imgURL)
		.getResult();
};

const generateNewBeer = (params: NewBeerParams): Beer => {
	const { name, breweryID, style, ibu, abv, imgURL }: NewBeerParams = params;
	return new BeerBuilder()
		.reset(name, breweryID)
		.setStyle(style)
		.setIBU(ibu)
		.setABV(abv)
		.setImageURL(imgURL)
		.getResult();
};

export default AddBeerView;
