let express = require('express');
let app = express();
const db = require('./db.js');

const passport = require('./auth.js');

require('dotenv').config();

const PORT = process.env.PORT || 2002 ;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(passport.initialize());



const logrequest = (req, res, next) => {

    console.log(`Method: ${req.method} URL: ${req.originalUrl} Time: [${new Date().toLocaleString()}]`);
    next();
}


// app.use(logrequest); // for each request

// app.use(passport.authenticate('local',{session: false}))

app.get('/',function(req, res){
    res.send("Welcome Sir What can I Do For you");
});

const PersonRouter = require('./routes/PersonRoutes');

app.use('/Person',PersonRouter); // for only person requests


app.listen(PORT,() =>{
    console.log("Welcome to Indian Food Services")
})