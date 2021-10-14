import CustomErrorHandler from '../sevices/CustomErrorHandler'
import JwtService from '../sevices/JwtService';

const auth = async (req,res,next) =>{

    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(CustomErrorHandler.unAuthorized());
    }
    const token  = authHeader.split(' ')[1];

    try{
        const { _id, email } = await JwtService.verify(token);
        const user = {
            _id,
            email
        };
        req.user = user;
        next();

    }catch(err){
        return next(CustomErrorHandler.unAuthorized());
    }
}

export default auth;