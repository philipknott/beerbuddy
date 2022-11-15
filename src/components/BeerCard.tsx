import Beer from '../classes/Beer';
import { BeerCharacteristic } from '../types';

export interface BeerCardProps {
	beer: Beer;
}

export const BeerCard = (props: any) => {
	const { beer }: BeerCardProps = props;

	return (
		<div className="section notification">
			<div className="columns is-align-items-center">
				<div className="column is-one-third mr-5">
					<figure className="image">
						<img src={beer.imageURL} />
					</figure>
				</div>
				<div className="column">
					<div className="content is-medium ml-5">
						<p className="title is-1 mb-1">{beer.name}</p>
						<p>{beer.brewery.name}</p>
						<div className="tags">
							{beer.averageCharacteristics.map((e: BeerCharacteristic) => (
								<span className="tag is-info">{e}</span>
							))}
						</div>
						<p className="mb-1">
							<b>Style: </b>
							{beer.style}
						</p>
						<p className="mb-1">
							<b>ABV: </b>
							{beer.abv}%
						</p>
						<p>
							<b>IBU: </b>
							{beer.ibu}
						</p>
						<p>
							<b>Average Rating: </b>
							{beer.averageRating} / 10
						</p>
						<progress
							className="progress is-info is-small"
							value={beer.averageRating}
							max="10"
						></progress>
					</div>
				</div>
			</div>
		</div>
	);
};
