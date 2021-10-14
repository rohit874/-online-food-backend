import express from 'express';
import Joi from 'joi';
import CustomErrorHandler from '../../sevices/CustomErrorHandler';
import {User,Refreshtoken} from '../../models';
import bcrypt from 'bcryptjs';
import JwtService from '../../sevices/JwtService';
import { REFRESH_SECRET } from '../../config';


const registerController = {
   async register(req, res, next) {

        //validation
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        })

        // console.log(req.body);
        const {error} = registerSchema.validate(req.body)
        if (error) {
            return next(error);
        }
        //check if already exist
        try{
            const exist = await User.exists({email:req.body.email});
            if (exist) {
                return next(CustomErrorHandler.alreadyExist("User already exist"));
            }
        }catch(err){
            return next(err);
        }
        const  {name, email, phone, password } = req.body;
        //hash Password
        const hashedPassword = await bcrypt.hash(password,10);

        //prepare the model
        const user = new User({
            name,
            email,
            phone,
            password: hashedPassword
        });

        let access_token;
        let refresh_token;

        try{
            const result = await user.save();

            console.log(result);
            //token
            access_token = JwtService.sign({_id: result._id, email: result.email});
            refresh_token = JwtService.sign({_id: result._id, email: result.email},'1y',REFRESH_SECRET);

            //store refreshToken in database
            await Refreshtoken.create({token:refresh_token});

        }catch(err){
            return next(err);
        }

        res.json({ access_token, refresh_token})
    }
}

export default registerController
