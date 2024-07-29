
const passport = require('passport');
const LocalStatergy = require('passport-local').Strategy;

const Person = require('./models/Person.js');



passport.use(new LocalStatergy(async(USERNAME,password,done)=>{
    try{
        console.log("Reciever crediential",USERNAME,password);
        const user = await  Person.findOne({username :USERNAME});
        if(!user){
            return done(null,false,{message: "incorrect username"});
        }
        const isUserMatch = await user.comparePassword(password);
        if(isUserMatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message: "incorrect username"});     
        }
    }
    catch(err){
        return done(err);
    }
}));

module.exports = passport;