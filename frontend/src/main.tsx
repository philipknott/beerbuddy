import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import BeerView from './pages/BeerView';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import './index.css';
import AddBeerView from './pages/AddBeerView';
import AddReviewView from './pages/AddReviewView';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/beer',
		element: <BeerView />,
	},
	{
		path: '/create-beer',
		element: <AddBeerView />,
	},
	{
		path: '/create-review',
		element: <AddReviewView />,
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<NavBar />
		<RouterProvider router={router} />
	</React.StrictMode>
);
