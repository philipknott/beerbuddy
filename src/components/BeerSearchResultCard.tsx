import { useNavigate } from 'react-router-dom';
import Beer from '../classes/Beer';

export interface BeerSearchResultCardProps {
	beer: Beer;
}

export const BeerSearchResultCard = (props: BeerSearchResultCardProps) => {
	const { beer }: BeerSearchResultCardProps = props;
	const navigate = useNavigate();

	return (
		<div
			className="media is-clickable"
			onClick={() => {
				navigate(`/beer?id=${beer.id}`);
			}}
		>
			<div className="media-left">
				<figure className="image is-64x64">
					<img src={beer.imageURL} />
				</figure>
			</div>
			<div className="media-content">
				<div className="content">
					<p className="title is-4 mb-2">
						<b>{beer.name}</b>
						<span className="has-text-grey"> - {beer.brewery.name}</span>
					</p>
					<div className="level">
						<div className="level-left">
							<div className="level-item">
								<p className="level-item">
									<b>IBU: </b>
									{beer.ibu}
								</p>
							</div>
							<div className="level-item">
								<p className="level-item">
									<b>ABV: </b>
									{beer.abv}%
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="media-right">
				<button className="button is-success">Review</button>
			</div>
		</div>
	);
};
