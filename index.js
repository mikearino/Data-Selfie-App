//An import statement
const express = require("express");

//Load express and save to a variable
const app = express();

//app will listen at 3000. Callback happens once server is
// listening
app.listen(3000, () => console.log("listening at 3000"));

//serve static files with middleware
app.use(express.static("public"));
