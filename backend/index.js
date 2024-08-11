const express = require('express');
const app = express();
const port = 5000;
const MongoDB = require("./db");
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

app.listen(port, () => {
    console.log(`${port} this port number is working...`);
});
