import { useDeferredValue, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Beer from '../classes/Beer';
import DB from '../classes/DB';
import { BeerSearchResultCard } from './BeerSearchResultCard';

export const BeerSearch = () => {
	const db = DB.instance;
	const navigate = useNavigate();

	const [beerResults, setBeerResults] = useState<Beer[] | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>('');

	const onSearch = async () => {
		setBeerResults(
			searchTerm === ''
				? await db.getAllBeers()
				: await db.getBeerResults(searchTerm)
		);
	};

	useEffect(() => {
		db.getAllBeers().then((allBeers) => setBeerResults(allBeers));
	}, []);

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
						<button
							className="button is-info is-light is-medium"
							onClick={() => navigate('/create-review')}
						>
							Add Review
						</button>
					</div>
				</div>
			</div>
			{!beerResults && <progress className="progress is-primary" max="100" />}
			{beerResults?.map((beer) => (
				<BeerSearchResultCard beer={beer} key={beer.id} />
			))}
		</div>
	);
};
