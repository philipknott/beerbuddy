import { BeerCard } from '../components/BeerCard';
import { useSearchParams } from 'react-router-dom';
import DB from '../classes/DB';

const BeerView = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const db = DB.instance;

	const beerId = searchParams.get('id');
	const beer = db.getBeerById(beerId);

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

			<BeerCard beer={beer} />
			<button className="button is-large is-success">Create Review</button>
		</div>
	);
};

export default BeerView;
