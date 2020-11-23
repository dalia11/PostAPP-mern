const express = require('express');
var cors = require('cors')
const app = express();
const mongoose = require('mongoose')
require('dotenv/config')

app.use(cors())

app.use(express.json()) // for parsing application/json --->for raw body
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded --->for form submition

app.use('/api/posts', require('./routes/api/Posts'))
app.use('/auth', require('./routes/Auth'))
app.use('/register', require('./routes/Register'))

//connect to database
const startApp = async () => {
    try {
        mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }
            , () => {
                console.log('connected to database');
                const PORT = process.env.PORT || 5000;
                app.listen(PORT, () => {
                    console.log(`server run on port ${PORT}`)
                }); //listen event to run our server
            })
    } catch (error) {
        console.log(error);
        startApp();
    }
}
startApp();

