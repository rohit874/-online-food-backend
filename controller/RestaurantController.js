import Restaurant from '../models/restaurant'
import Products from '../models/products'

const restaurantController = {
    async getRestaurant(req, res, next) {
        let documents;
        try {
            documents = await Restaurant.find().sort({ _id: 1 });

        } catch (err) {
            return next(err);
        }
        return res.json(documents);
    },

    async searchRestaurant(req,res){
        try{
            const result = await Restaurant.find({'name': {'$regex' : `^${req.params.name}`, '$options' : 'i'}});
            
            if (!result) {
                return res.json({result:[]})
            }
            res.json({result});
        } catch(err){
            return res.status(404).json({message:"No result found"});
        }
    },

    async showRestaurant(req, res, next) {
        let document = {};
        try {
            document.resInfo = await Restaurant.findOne({ _id: req.params.id });
            document.resItems = await Products.find({ res_id: req.params.id });
        } catch (err) {
            return next(err);
        }
        return res.json(document);
    },

    async showCartItems(req, res, next) {
        let document;
        console.log(req.body.ids);
        try {
            document = await Products.find({_id:{$in:req.body.ids}});
        } catch (err) {
            return next(err);
        }
        return res.json(document);
    },

}
export default restaurantController
