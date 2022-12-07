import { BeerParams } from '../../types';
import Beer from '../Beer';
import Adapter from './Adapter';

export default class frontendAdapter extends Adapter {
	public request(response: Beer): BeerParams {
		return {
			beername: response.name,
			breweryname: response.brewery,
			beerstyle: response.style,
			ibu: response.ibu,
			abv: response.abv,
			img: response.imageURL,
			rating: response.rating,
		};
	}
}
