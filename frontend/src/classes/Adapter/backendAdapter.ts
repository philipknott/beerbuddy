import Beer from '../Beer';
import BeerBuilder from '../Builder/BeerBuilder';
import { BeerParams } from '../../types';
import Adapter from './Adapter';

export default class backendAdapter extends Adapter{
    private builder: BeerBuilder;

    constructor(){
        super();
        this.builder = new BeerBuilder();
    }

    public request(response:any){
        var tempBeers:Beer[];
        tempBeers = response.map((params: BeerParams) => {
            const { beername, breweryname, beerstyle, abv, ibu, img, rating } = params;
            return this.builder
                .reset(beername, breweryname)
                .setStyle(beerstyle)
                .setABV(abv)
                .setIBU(ibu)
                .setImageURL(img)
                .setRating(rating)
                .getResult();
        });
        return tempBeers;
    }
}