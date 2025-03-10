const mongoose = require('mongoose')

ConnectToMongo=async()=>{
    
    await mongoose.connect(process.env.MONGODB_URL)
    .then((data)=>console.log(`Mongodb Connected Successfully on ${data.connection.host}`))
    // .catch(err => console.log(err)) // we dont need this catch bcoz in server.js we have handled promise rejection
}
module.exports = ConnectToMongo;