// const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const { Route } = require('react-router-dom');
const {Schema} = mongoose;
const OrdersSchema = new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    order_dat:{
        type:Array,
        require:true
    },
})
module.exports = mongoose.model('order',OrdersSchema);