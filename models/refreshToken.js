import mongoose from "mongoose";

const Schema = mongoose.Schema;

const refreshtokenSchema = new Schema({
    token: {type:String, unique:true}
}, {timestamps:false});


export default mongoose.model('Refreshtoken', refreshtokenSchema , 'refreshtoken');