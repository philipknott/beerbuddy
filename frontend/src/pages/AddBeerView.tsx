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
		let brewery: Brewery;

		if (newBreweryParams) {
			// Create new Brewery with given parameters
			const { name, location, imgURL }: NewBreweryParams = newBreweryParams;
			brewery = new BreweryBuilder()
				.reset(name)
				.setLocation(location)
				.setImageURL(imgURL)
				.getResult();

			db.addBrewery(brewery);

			newBeerParams.breweryID = brewery.id;
		}

		const { name, breweryID, style, ibu, abv, imgURL }: NewBeerParams =
			newBeerParams;

		const beer = new BeerBuilder()
			.reset(name, breweryID)
			.setStyle(style)
			.setIBU(ibu)
			.setABV(abv)
			.setImageURL(imgURL)
			.getResult();

		db.addBeer(beer);
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

export default AddBeerView;
