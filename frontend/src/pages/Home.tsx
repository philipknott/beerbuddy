import { BeerSearch } from '../components/BeerSearch';
import DB from '../classes/DB';

const db = DB.instance;

const Home = () => {
	return (
		<div>
			<div className="hero is-info">
				<div className="hero-body has-text-centered">
					<div className="container">
						<p className="title is-1">Beer Buddy</p>
						<p className="subtitle">Craft Beer Rating Platform</p>
					</div>
				</div>
			</div>

			<div className="section container">
				<BeerSearch />
			</div>
		</div>
	);
};

export default Home;
