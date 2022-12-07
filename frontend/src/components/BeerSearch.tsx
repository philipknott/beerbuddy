import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Beer from '../classes/Beer';
import DB from '../classes/DB';
import { BeerSearchResultCard } from './BeerSearchResultCard';

export const BeerSearch = () => {
	const navigate = useNavigate();

	const [allBeers, setAllBeers] = useState<Beer[]>([]);
	const [beerResults, setBeerResults] = useState<Beer[] | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>('');

	const onSearch = () => {
		if (searchTerm === '') {
			setBeerResults(allBeers);
			console.log(beerResults);
		} else {
			setBeerResults(
				allBeers.filter((beer) => {
					const name = beer.name.toLowerCase();
					const brewery = beer.brewery.toLowerCase();
					return searchTerm.includes(name) || searchTerm.includes(brewery);
				})
			);
		}
	};

	const onDelete = async (beer: Beer) => {
		await DB.instance.removeBeer(beer);
		setAllBeers(await DB.instance.getAllBeers());
		setBeerResults(beerResults!.filter((e) => e != beer));
	};

	useEffect(() => {
		DB.instance.getAllBeers().then((result) => {
			setAllBeers(result);
			setBeerResults(result);
		});
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
						onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
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
			{!beerResults && <progress className="progress is-primary" max="100" />}
			{beerResults?.map((beer, i) => (
				<BeerSearchResultCard beer={beer} onDelete={onDelete} key={i} />
			))}
		</div>
	);
};
