import Beer from './Beer';
import { v4 as uuidv4 } from 'uuid';

export default class Brewery {
	private _id: string = uuidv4();
	private _name: string;
	private _location?: string;
	private _imageURL?: string;

	constructor(name: string) {
		this._name = name;
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get location(): string | undefined {
		return this._location;
	}

	set location(location: string | undefined) {
		this._location = location;
	}

	get imageURL(): string | undefined {
		return this._imageURL;
	}

	set imageURL(imageURL: string | undefined) {
		this._imageURL = imageURL;
	}
}
