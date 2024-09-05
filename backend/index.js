const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

const MongoDB = require("./db");
require('dotenv').config();
MongoDB();


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Page is working.....");
});

app.use('/api', require("./router/CreateUser"));
app.use('/api', require("./router/LoginUser"));
app.use('/api', require("./router/DisplayData"));
app.use('/api', require("./router/OrderData"));
// app.use('/api', require("./router/myOrderData"));

app.listen(port, () => {
    console.log(`${port} this port number is working...`);
});

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });



const corsOptions = {
  origin: ['http://localhost:3000', 'https://food-management-aamu.vercel.app'], // Add your Vercel URL here
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


