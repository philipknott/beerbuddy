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

async function populateMDB(beer,brewery,id) { // ## Populates the mongodb
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('beer');
    //db.user.insert({name: "#Mojito", id: 1503905472822542336, geo: null})
    collection.insertOne({beername: beer, breweryname: brewery,beerid:id}, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
}

async function main(){ 
    /*for (let i = 0; i < 25; i++) {//RUN EVERY THURSDAY AT NOON
      getRequest(CocktailHashtag[i],CocktailNames[i])
    }
    const res = await queryMDB()*/
    return 1;
}

(async () => {
    try {
        console.log("############## START ##################")
        // Make request
        const response = await main();
        console.dir(response, {
            depth: null
        });
        //await checkMDB()
  
    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
})();


app.listen(3001,function() {
    console.log("express started at 3001");
})