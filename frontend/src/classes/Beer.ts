export default class Beer {
	private _name: string;
	private _brewery: string;

	// Optional parameters
	private _style?: string;
	private _abv?: number;
	private _ibu?: number;
	private _rating?: number;
	private _imageURL?: string;

	constructor(name: string, brewery: string) {
		this._name = name;
		this._brewery = brewery;
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

	set rating(rating: number | undefined) {
		this._rating = rating;
	}

	get rating(): number | undefined {
		return this._rating;
	}

	set imageURL(imageURL: string | undefined) {
		this._imageURL = imageURL;
	}

	get imageURL(): string | undefined {
		return this._imageURL;
	}
}
