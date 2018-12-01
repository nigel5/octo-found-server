const express = require('express'); 
const app = express();

require("dotenv").config();
const routes = require('./routes');
 

// require db connection
require('./models');

// configure body parser for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect with client
 

app.use(routes);


// app.listen(process.env.PORT || 5000, () => {
// 	console.log(`Server listening on port ${PORT}.`);
// });
app.listen(process.env.PORT || 5000, function () {
    console.log('connect success');
});