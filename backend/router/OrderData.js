const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    const data = req.body.order_data;
    const orderDate = new Date();
    
    // Add the order date at the beginning of the order data array
    const newData = [{ Order_date: orderDate }, ...data];

    try {
        // Check if an order already exists for the given email
        let existingOrder = await Order.findOne({ email: req.body.email });

        if (existingOrder === null) {
            // Create a new order if one doesn't exist
            await Order.create({
                email: req.body.email,
                order_data: [newData]
            });
        } else {
            // Update the existing order by adding new order data
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: newData } }
            );
        }

        // Send success response
        res.json({ success: true });
    } catch (error) {
        // Handle any errors that occur during the operation
        res.status(500).send({ message: "Server Error", error: error.message });
    }
});

module.exports = router;
