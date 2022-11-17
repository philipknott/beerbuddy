import BeerBuilder from '../classes/Builder/BeerBuilder';
import BreweryBuilder from '../classes/Builder/BreweryBuilder';
import { BeerStyle } from '../types';

const breweryBuilder = new BreweryBuilder();

const brewery1 = breweryBuilder
	.reset('Kona Brewing Co.')
	.setLocation('Honolulu, HI')
	.setImageURL(
		'https://pbs.twimg.com/profile_images/1133527993341628416/P6cDlqM0_400x400.png'
	)
	.getResult();

const brewery2 = breweryBuilder
	.reset('Lagunitas Brewing Co.')
	.setLocation('Petaluma, CA')
	.setImageURL(
		'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.napavalleylifemagazine.com%2Fevent%2Fmasters-dinner-lagunitas-brewing-company%2F&psig=AOvVaw3k-l3gDdjPH_iBCJZ6Sk4H&ust=1668644268232000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCMCmzLq2sfsCFQAAAAAdAAAAABAD'
	)
	.getResult();

const brewery3 = breweryBuilder
	.reset('New Belgium Brewing Co.')
	.setLocation('Fort Collins, CO')
	.setImageURL(
		'https://cdn.craftbeer.com/wp-content/uploads/2015/07/21183618/NBB_Bike_Text_Logo_-_Red__Putty.jpg-1-copy.jpg'
	)
	.getResult();

const beerBuilder = new BeerBuilder();

const beer1 = beerBuilder
	.reset('Longboard')
	.setBrewery(brewery1)
	.setStyle(BeerStyle.PALE_LAGER)
	.setABV(4.6)
	.setIBU(20)
	.setImageURL(
		'https://konabrewingco.com/uploads/images/beers/_275x350_crop_center-center_75/KO-Longboard-pint-600x830-for-web.png'
	)
	.getResult();

const beer2 = beerBuilder
	.reset('Big Wave')
	.setBrewery(brewery1)
	.setStyle(BeerStyle.BROWN_ALE)
	.setABV(4.4)
	.setIBU(21)
	.setImageURL(
		'https://konabrewingco.com/uploads/images/beers/_275x350_crop_center-center_75/KO-Big-Wave-Bottlepint-600x830-for-web.png'
	)
	.getResult();

const beer3 = beerBuilder
	.reset('Lagunitas IPA')
	.setBrewery(brewery2)
	.setStyle(BeerStyle.INDIA_PALE_ALE)
	.setABV(6.2)
	.setIBU(51)
	.setImageURL(
		'https://halftimebeverage.com/media/catalog/product/cache/7374a2b175e752c024da2c8661bed23b/2/4/2457.png'
	)
	.getResult();

const breweries = [brewery1, brewery2, brewery3];
const beers = [beer1, beer2, beer3];
const testData = { beers, breweries };

export default testData;
