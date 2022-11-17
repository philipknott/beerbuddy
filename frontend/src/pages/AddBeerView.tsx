import { AddBeerForm } from '../components/AddBeerForm';

const AddBeerView = () => {
	const onSubmit = () => {};

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
