import { useNavigate } from 'react-router-dom';
import AddReviewForm from '../components/AddReviewForm';

const AddReviewView = () => {
	const navigate = useNavigate();

    const onSubmit = (review:string) => {
        console.log(review);
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
			<AddReviewForm onSubmit={onSubmit} />
		</div>
	);
};

export default AddReviewView;