import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    item_id: {type:String, required:true},
    res_id: {type:String, required:true},
    user_id: {type:String, required:true},
    Qty: {type:Number, required:true},
    price: {type:String, required:true},
    name: {type:String, required:true},
    image: {type:String, required:true},
    address: {type:String, required:true},
    payment: {type:String, required:true},
    status: {type:String, required:true},
    date: {type:String, required:true}
}, {timestamps:true});


export default mongoose.model('Order', orderSchema , 'orders');