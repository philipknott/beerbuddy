import { BeerCharacteristic } from '../types';
import { v4 as uuidv4 } from 'uuid';

export default class Beer {
	private _id: string = uuidv4();
	private _name: string;
	private _brewery: string;

	// Optional parameters
	private _style?: string;
	private _abv?: number;
	private _ibu?: number;
	private _imageURL?: string;
	private _averageRating?: number;
	private _averageCharacteristics: BeerCharacteristic[] = []; // this will eventually use decorator

	constructor(name: string, brewery: string) {
		this._name = name;
		this._brewery = brewery;
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get brewery(): string {
		return this._brewery;
	}

	set style(style: string | undefined) {
		this._style = style;
	}

	get style(): string | undefined {
		return this._style;
	}

	set abv(abv: number | undefined) {
		this._abv = abv;
	}

	get abv(): number | undefined {
		return this._abv;
	}

	set ibu(ibu: number | undefined) {
		this._ibu = ibu;
	}

	get ibu(): number | undefined {
		return this._ibu;
	}

	set imageURL(imageURL: string | undefined) {
		this._imageURL = imageURL;
	}

	get imageURL(): string | undefined {
		return this._imageURL;
	}

	get averageCharacteristics(): BeerCharacteristic[] {
		return this._averageCharacteristics;
	}
}
