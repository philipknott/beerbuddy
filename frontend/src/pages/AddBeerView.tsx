import { useNavigate } from 'react-router-dom';
import Beer from '../classes/Beer';
import DB from '../classes/DB';
import AddBeerForm from '../components/AddBeerForm';

const AddBeerView = () => {
	const navigate = useNavigate();

	const onSubmit = async (newBeer: Beer) => {
		await DB.instance.addBeer(newBeer);
		navigate('/');
	};

	return (
		<div className="container section is-max-desktop">
			<nav className="breadcrumb">
				<ul>
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="#">Add Beer</a>
					</li>
				</ul>
			</nav>
			<AddBeerForm onSubmit={onSubmit} />
		</div>
	);
};

export default AddBeerView;
