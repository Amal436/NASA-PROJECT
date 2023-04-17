require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

mongoose.set('strictQuery',false);
mongoose.connection.once('open',()=>{
    console.log('mongo db connected successfully');
})
mongoose.connection.on('error',(err)=>{
    console.error(err);
});

function mongoConnect(){
   mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

async function mongoDisconnect(){
   await mongoose.disconnect();
}

module.exports= {mongoConnect,mongoDisconnect}