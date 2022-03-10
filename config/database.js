const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('SUCCESS: Mongo Database Online!');
    } catch (error) {
        console.log(error);
        console.log('----------------------------')
        throw new Error('ERROR: Failed to initialize the database');
    }
}

module.exports = {
    dbConnection
}
