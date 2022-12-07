import { BeerCard } from '../components/BeerCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DB from '../classes/DB';
import { useState } from 'react';
import Beer from '../classes/Beer';

const BeerView = () => {
	const [searchParams, _] = useSearchParams();
	const [beer, setBeer] = useState<Beer | undefined>(undefined);
	const navigate = useNavigate();

	const name = searchParams.get('name');
	const brewery = searchParams.get('brewery');
	DB.instance.getBeer(name!, brewery!).then((result) => setBeer(result));

	const onDelete = () => {
		DB.instance.removeBeer(beer!);
		navigate('/');
	};

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
			{beer && <BeerCard beer={beer} />}
			<button
				className="button is-large is-danger is-pulled-right"
				disabled={!beer}
				onClick={onDelete}
			>
				Delete
			</button>
		</div>
	);
};

export default BeerView;
