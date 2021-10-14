import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { APP_URL } from '../config';

const restaurantSchema = new Schema(
    {
        name: { type: String, required: true },
        location: {type: String, required: true},
        type: {type: String, required: true},
        rating: {type: String, required: true},
        delivery_time: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true, 
            get: (image) =>{
                return `${APP_URL}/${image}`;
            } },
        //     get: (image) => {
        //         // http://localhost:5000/uploads/1616443169266-52350494.png
        //         if (process.env.ON_HEROKU == 'true') {
        //             return `${image}`;
        //         } 
        //         return `${APP_URL}/${image}`;
        //     },
        // },
    },
    { timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model('Restaurant', restaurantSchema, 'restaurant');