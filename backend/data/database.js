const mongoose = require('mongoose')

let connection = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect( process.env.URI_DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log('DB connection succsefuly')
    } catch (err) {
        console.log(err.message)
    }
}

connection()
