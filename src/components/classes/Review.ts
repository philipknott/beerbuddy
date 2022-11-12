export default class Review {
	private _rating: number;

	constructor(rating: number) {
		this._rating = rating;
	}

	get rating(): number {
		return this._rating;
	}

	set rating(rating: number) {
		this._rating = rating;
	}
}
