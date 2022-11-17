const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoURI = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(mongoURI);

app.use(cors());
app.use(express.json());

// Database Name
const dbName = 'beerbuddies';

async function populateMDB(beer,brewery,style,abv,ibu,img) { // ## Populates the mongodb
    // Use connect method to connect to the server
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('beer');
    collection.insertOne({beername: beer, breweryname: brewery, beerstyle:style, abv:abv, ibu:ibu, img:img}, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
}

async function queryMDB() { 
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('beer');
    const data = await collection.find({}).toArray();
    return data;
  }

app.get("/allBeer", function (req, res){
    data = queryMDB()
    return data;
})

app.post("/create-beer", function (req, res){
    populateMDB(req.body.beerName, req.body.brewery, req.body.style,req.body.abv, req.body.ibu, req.body.imgURL);
})

async function main(){ 
    //populateMDB("Longboard", "Kona Brewing Co.", 4.6, 20, "https://www.totalwine.com/dynamic/x490,6pk/media/sys_master/twmmedia/h22/h37/14160575135774.png");  //example
    const response = await queryMDB();
    console.log(response);
    return 1;
}

(async () => {
    try {
        // Make request
        const response = await main();
        console.dir(response, {
            depth: null
        });
  
    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
})();


app.listen(3001,function() {
    console.log("express started at 3001");
})