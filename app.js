const path = require('path');
const express = require("express");
const cors = require("cors");
const config = require('./config');

const app = express();
app.use(express.json());

app.use(cors());


// Template engine
app.set("view engine", "ejs");
app.set('views', 'views');


// Importing Routes
const appRoutes = require("./routes/app.routes");
const bodyParser = require("body-parser");



app.use(express.static(path.join(__dirname, "assets")));
app.use(bodyParser.urlencoded({ extended: false }));

// App Routes
app.use(appRoutes);



app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}.`);
})
