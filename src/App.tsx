import { useState } from 'react';
import './App.css';
import { BeerCard } from './components/BeerCard';
import { BeerView } from './components/BeerView';

function App() {
	return (
		<div className="App">
			<BeerView />
		</div>
	);
}

export default App;
