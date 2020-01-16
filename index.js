//An import statement
const express = require("express");

//Load express and save to a variable
const app = express();

//app will listen at 3000. Callback happens once server is
// listening
app.listen(3000, () => console.log("listening at 3000"));

//serve static files with middleware
app.use(express.static("public"));

//Recognize incoming request object as JSON
app.use(express.json({ limit: "1mb" }));

//post request. Callback looks at info- sends response back
//request holds all of the information about the particular client
//response can send things back to the client
app.post("/api", (request, response) => {
  console.log(request.body);
  const data = request.body;
  response.json({
    status: "success",
    latitude: data.lat,
    longitude: data.lon
  });
});
