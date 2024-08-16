const mongoose = require('mongoose');
const mongoURL = 'mongodb://0.0.0.0:27017/apnafood';

const MongoDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");

        // Fetch data from the "foodData2" collection
        const foodData = await mongoose.connection.db.collection("foodData2").find({}).toArray();
        global.food_items = foodData;

        // Fetch data from the "foodCategory" collection
        const foodCategoryData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.food_category = foodCategoryData;

        console.log("Data fetched and stored in global variables");
    } catch (err) {
        console.error("Error connecting to MongoDB or fetching data:", err);
    } finally {
        // Optionally, you can disconnect after the operations if it's a short-lived process
        // await mongoose.disconnect();
    }
};

module.exports = MongoDB;
