import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Beer from '../classes/Beer';
import DB from '../classes/DB';
import { BeerSearchResultCard } from './BeerSearchResultCard';

export const BeerSearch = () => {
	const navigate = useNavigate();
	const db = DB.instance;

	const [beerResults, setBeerResults] = useState<Beer[]>(db.allBeers);
	const [searchTerm, setSearchTerm] = useState<string>('');

	const onSearch = () => {
		setBeerResults(db.getBeerResults(searchTerm));
	};

	return (
		<div>
			<p className="title is-1">Search Beer</p>
			<div className="columns">
				<div className="column">
					<input
						className="input is-medium"
						type="text"
						placeholder="Beer/Brewery Name"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyDown={(e) => {
							if (e.key == 'Enter') {
								onSearch();
							}
						}}
					/>
				</div>
				<div className="column">
					<div className="buttons">
						<button className="button is-info is-medium" onClick={onSearch}>
							Search
						</button>
						<button
							className="button is-info is-light is-medium"
							onClick={() => navigate('/create-beer')}
						>
							Add Beer
						</button>
					</div>
				</div>
			</div>
			{beerResults.map((beer) => (
				<BeerSearchResultCard beer={beer} key={beer.name} />
			))}
		</div>
	);
};
