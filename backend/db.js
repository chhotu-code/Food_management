const mongoose = require('mongoose');
const mongoURL = 'mongodb://0.0.0.0:27017/apnafood';

const MongoDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connected DB ");

        const fetch_data = await mongoose.connection.db.collection("foodData2").find({}).toArray();
        global.food_items = fetch_data;

        const fetch_data_category = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.food_category = fetch_data_category;
        // console.log(fetch_data);
    } catch (err) {
        console.error("Error connecting to MongoDB or fetching data:", err);
    }
};

const apiUrl = process.env.REACT_APP_API_URL;
fetch(`${apiUrl}/api/fooditems`)
    .then(response => response.json())
    .then(data => console.log(data));

module.exports = MongoDB;
