import { useNavigate } from 'react-router-dom';
import Beer from '../classes/Beer';

export interface BeerSearchResultCardProps {
	beer: Beer;
	onDelete: (beer: Beer) => void;
}

export const BeerSearchResultCard = (props: BeerSearchResultCardProps) => {
	const { beer, onDelete }: BeerSearchResultCardProps = props;
	const navigate = useNavigate();

	return (
		<div className="media">
			<div className="media-left">
				<figure className="image is-64x64">
					<img src={beer.imageURL} />
				</figure>
			</div>
			<div
				className="media-content is-clickable"
				onClick={() => {
					navigate(`/beer?name=${beer.name}&brewery=${beer.brewery}`);
				}}
			>
				<div className="content">
					<p className="subtitle mb-2">
						<b>{beer.name}</b>
						<span className="has-text-grey"> - {beer.brewery}</span>
					</p>
					<div className="level">
						<div className="level-left">
							<div className="level-item">
								{beer.ibu && (
									<p className="level-item">
										<b>IBU: </b>
										{beer.ibu}
									</p>
								)}
							</div>
							<div className="level-item">
								{beer.abv && (
									<p className="level-item">
										<b>ABV: </b>
										{beer.abv}%
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="media-right">
				<button className="button is-danger" onClick={() => onDelete(beer)}>
					Delete
				</button>
			</div>
		</div>
	);
};
