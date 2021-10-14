import Joi from "joi";
import { REFRESH_SECRET } from "../../config";
import { User, Refreshtoken } from "../../models";
import RefreshToken from "../../models/refreshToken";
import CustomErrorHandler from "../../sevices/CustomErrorHandler";
import JwtService from "../../sevices/JwtService";

const refreshController = {
    async refresh(req,res,next){

        //validation
        const loginSchema = Joi.object({
            refresh_token: Joi.string().required(),
        });

    const { error } = loginSchema.validate(req.body);

    if (error) {
        return next(error);
    }
    //checking in database
    let refreshtoken;

    try{
        refreshtoken = await RefreshToken.findOne({token:req.body.refresh_token});
        if (!refreshtoken) {
            return next(CustomErrorHandler.unAuthorized("invalid refresh token"));
        }
        let userId;
        try{
            const { _id } = await JwtService.verify(refreshtoken.token, REFRESH_SECRET);
            userId = _id;

        } catch(err){
            return next(CustomErrorHandler.unAuthorized("invalid refresh token"));
        }

        const user = await User.findOne({_id:userId});
        if (!user) {
            return next(CustomErrorHandler.unAuthorized("user not found"));
        }
         // access token
         const access_token = JwtService.sign({_id: user._id, email: user.email});
         const refresh_token = JwtService.sign({_id: user._id, email: user.email},'1y',REFRESH_SECRET);
 
        //store refreshToken in database
        await Refreshtoken.create({token:refresh_token});

        res.json({ access_token, refresh_token})

    } catch(err){
        return next(err);
    }


    }
};

export default refreshController;