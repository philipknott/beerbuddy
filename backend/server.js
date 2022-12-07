const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { setMaxIdleHTTPParsers } = require('http');
const mongoURI = 'mongodb://0.0.0.0:27017/';
const client = new MongoClient(mongoURI);

app.use(cors());
app.use(express.json());

// Database Name
const dbName = 'beerbuddies';

async function populateMDB(beer, brewery, style, abv, ibu, img,rating) {
	// ## Populates the mongodb
	// Use connect method to connect to the server
	await client.connect();
	const db = client.db(dbName);
	const collection = db.collection('beer');
	collection.insertOne(
		{
			beername: beer,
			breweryname: brewery,
			beerstyle: style,
			abv: abv,
			ibu: ibu,
			img: img,
			rating: rating,
		},
		function (err, res) {
			if (err) throw err;
			console.log('1 document inserted');
		}
	);
}

async function deleteBeer(beerName, brewery) {
	// ## deletes a entry from the mongodb
	// Use connect method to connect to the server
	await client.connect();
	const db = client.db(dbName);
	const collection = db.collection('beer');
	collection.deleteOne(
		{ beername: beerName, breweryname: brewery },
		function (err, res) {
			if (err) throw err;
			console.log('1 entry deleted');
		}
	);
}

async function queryMDB() {
	await client.connect();
	const db = client.db(dbName);
	const collection = db.collection('beer');
	const data = await collection.find({}).toArray();
	return data;
}

app.get('/allBeer', async function (req, res) {
	data = await queryMDB();
	console.log(data);
	res.send(data);
});

app.post('/create-beer', function (req, res) {
	console.log('req.body');
	console.log(req.body);

	populateMDB(
		req.body.beername,
		req.body.breweryname,
		req.body.beerstyle,
		req.body.abv,
		req.body.ibu,
		req.body.img
		// req.body.rating,
		// req.body.characteristics
	);
});

async function main() {
	/*populateMDB(
		'Longboard',
		'Kona Brewing Co.',
		4.6,
		20,
		'https://www.totalwine.com/dynamic/x490,6pk/media/sys_master/twmmedia/h22/h37/14160575135774.png'
	);*/
	const response = await queryMDB();
	console.log(response);
	/*deleteBeer('Longboard', 'Kona Brewing Co.');
	setTimeout(async () => {
		console.log(await queryMDB());
	}, 5000);*/
	return 1;
}

(async () => {
	try {
		// Make request
		const response = await main();
		console.dir(response, {
			depth: null,
		});
	} catch (e) {
		console.log(e);
		process.exit(-1);
	}
})();

app.listen(3001, function () {
	console.log('express started at 3001');
});
