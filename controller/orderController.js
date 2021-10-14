import {Products} from '../models'
import Order from '../models/orders'
const OrderController = {

    async placeOrder(req,res,next){
       let data;
       let ids;
       let order=[];
       let Qty = req.body.items;
       ids = Object.keys(req.body.items);
       data = await Products.find({_id:{$in:ids}});
        data.map((items) => {
           let newdata = {
            item_id:items._id.toString(),
            res_id: items.res_id,
            user_id: req.user._id,
            Qty : Qty[items._id],
            price: items.price*Qty[items._id],
            name: items.name,
            image: items.image,
            address: req.body.data.address,
            payment: req.body.data.pay,
            date: req.body.data.date,
            status: "pending"
        };
            order = [...order,newdata];
        });

        //prepare the model
        const orders = new Order();
        let result;
        try{
            result = await orders.collection.insertMany(order);

        } catch(err){
           return next(err);
        }
        return res.json({status:1});
    },

    async getOrders(req,res,next){
        let data;
        try{
         data = await Order.find( { $and : [{ $or : [ {"status" : "pending"},{"status" : "confirmed"}]},{ "user_id":req.user._id }]});
        } catch(err){
            return next(err);
        }
        console.log(data);
        return res.json(data)

        // let order=[];
        // let newdata={};
        // data.map((items) => {
        //     newdata[items.item_id] = {
        //      item_id:items.item_id,
        //      res_id: items.res_id,
        //      user_id: items.user_id, 
        //      Qty : items.Qty,
        //      price: items.price,
        //      date: items.date,
        //      status: items.status
        //  };
        //  order = {...order,newdata};
        //  });
    }
}

export default OrderController
