import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { APP_URL } from '../config';

const productSchema = new Schema(
    {
        res_id:{ type: String, required: true },
        name: { type: String, required: true },
        decription: { type: String },
        price: { type: Number, required: true },
        image: { type: String, required: true, get: (image) =>{
            return `${APP_URL}/${image}`;
        } },
    },
    { timestamps: true, toJSON: { getters:true }}
);

export default mongoose.model('Products', productSchema, 'products');