import Beer from './classes/Beer';

export interface BeerCardProps {
	beer: Beer;
}

export const BeerCard = (props: any) => {
	const { beer } = props;

	return (
		<div className="notification">
			<div className="columns">
				<div className="column is-one-quarter">
					<figure className="image">
						<img src={beer.imageURL} alt={beer.name} />
					</figure>
				</div>
				<div className="column">
					<div className="content">
						<h1>{beer.name} </h1>
						<p className="m-0">
							<b>Brewery: </b>
							{beer.brewery.name}
						</p>
						<p>
							<b>Style: </b>
							{beer.style}
						</p>
						<p>
							<b>Average rating: </b>
							{beer.averageRating} / 10
						</p>
						<progress
							className="progress is-small"
							value={beer.averageRating}
							max="10"
						></progress>
						<p>This is some dummy text.</p>
					</div>
				</div>
			</div>
		</div>
	);
};
