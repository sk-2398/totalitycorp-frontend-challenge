const mongoose = require('mongoose');
const MongoURI='mongodb://127.0.0.1:27017/sylver?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';


const connectToMongo= () =>{
    mongoose.connect(MongoURI)
}

module.exports = connectToMongo