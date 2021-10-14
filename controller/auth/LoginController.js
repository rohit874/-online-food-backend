import Joi from "joi";
import { User, Refreshtoken } from "../../models";
import CustomErrorHandler from "../../sevices/CustomErrorHandler";
import bcrypt from 'bcryptjs';
import JwtService from '../../sevices/JwtService';
import { REFRESH_SECRET } from "../../config";

const loginController ={
    async login(req,res,next){
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });

    const { error } = loginSchema.validate(req.body);

    if (error) {
        return next(error);
    }

    try{
        const user = await User.findOne({email:req.body.email});
        
        if (!user) {
            return next(CustomErrorHandler.wrongCredentials());
        }

        //compare password
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match){
            return next(CustomErrorHandler.wrongCredentials());
        }

        // access token
        const access_token = JwtService.sign({_id: user._id, email: user.email});
        const refresh_token = JwtService.sign({_id: user._id, email: user.email},'1y',REFRESH_SECRET);

            //store refreshToken in database
            await Refreshtoken.create({token:refresh_token});

        res.json({ access_token, refresh_token});
        
    } catch(err){
        return next(err);
    }

    },
    async logout(req,res,next){
         //validation
         const loginSchema = Joi.object({
            refresh_token: Joi.string().required(),
        });

    const { error } = loginSchema.validate(req.body);

    if (error) {
        return next(error);
    }

        try{
            await Refreshtoken.deleteOne({token:req.body.refresh_token});

        } catch(arr){
            next(new Error("somthing went wrong"));
        }
        res.json({status:1});
    }
}

export default loginController;