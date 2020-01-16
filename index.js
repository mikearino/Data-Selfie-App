//Import statement
const express = require("express");
const Datastore = require("nedb");

//Load express and save to a variable
const app = express();

//app will listen at 3000. Callback happens once server is
// listening
app.listen(3000, () => console.log("listening at 3000"));

//serve static files with middleware
app.use(express.static("public"));

//Recognize incoming request object as JSON
app.use(express.json({ limit: "1mb" }));

//Database
const database = new Datastore("database.db");
//loads on startup
database.loadDatabase();

//get request grabs json object query from the database
app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

//post request. Callback looks at info- sends response back
//request holds all of the information about the particular client
//response can send things back to the client
app.post("/api", (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  //Rather than push- .insert
  database.insert(data);
  //sends object back to client
  response.json({
    status: "success",
    latitude: data.lat,
    timestamp: timestamp,
    longitude: data.lon
  });
});
