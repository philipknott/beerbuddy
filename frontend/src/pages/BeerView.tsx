import { BeerCard } from '../components/BeerCard';
import { useSearchParams } from 'react-router-dom';
import DB from '../classes/DB';
import Beer from '../classes/Beer';
import { useState } from 'react';

const BeerView = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const db = DB.instance;

	const [beer, setBeer] = useState<Beer | undefined>(undefined);

	const beerID = searchParams.get('id');
	db.getBeerById(beerID).then((value) => setBeer(value));

	return (
		<div className="container mt-5">
			<nav className="breadcrumb">
				<ul>
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="#">{beer?.name}</a>
					</li>
				</ul>
			</nav>

			{beer && (
				<>
					<BeerCard beer={beer} />
					<button className="button is-large is-success is-pulled-right">
						Create Review
					</button>
				</>
			)}
		</div>
	);
};

export default BeerView;
