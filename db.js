const mongoose = require('mongoose')

module.exports = mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
)
.then( () => console.log("Connected to the database."))
.catch( err => console.log(err))

