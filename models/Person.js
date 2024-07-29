const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type :String,
        require : true
    },
    age: {
        type : Number,
        require: true
    },
    work: {
        type: String,
        enum: ['chef','manager','waiter'],
        require: true
    },
    mobile: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require:true,
        unique: true
    },
    address: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true,
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,

        require: true
    }
});

personSchema.pre('save', async function(next){
    const person = this;

    if(!person.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(person.password,salt);
        person.password = hash;
        next();
    }
catch(err){
    return next(err);
}
})
personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const ismatch = await bcrypt.compare(candidatePassword,this.password);
        return ismatch;
    }
    catch(err){
        throw err;
    }
}

const Person = mongoose.model('Person',personSchema);

module.exports = Person;