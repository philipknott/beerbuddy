import Beer from '../Beer';
import BeerBuilder from '../Builder/BeerBuilder';
import { BeerParams } from '../../types';

export default class backendAdapter{
    private builder: BeerBuilder;

    constructor(){
        this.builder = new BeerBuilder();
    }

    public createBeer(response:any){
        var tempBeers:Beer[];
        tempBeers = response.map((params: BeerParams) => {
            const { beername, breweryname, beerstyle, abv, ibu, img } = params;
            return this.builder
                .reset(beername, breweryname)
                .setStyle(beerstyle)
                .setABV(abv)
                .setIBU(ibu)
                .setImageURL(img)
                .getResult();
        });
        return tempBeers;
    }
}