class CustomErrorHandler extends Error{
    constructor(status,msg){
        super();
        this.status = status,
        this.message = msg;
    }

    static alreadyExist(message){
        return new CustomErrorHandler(409,message);
    }

    static wrongCredentials(message='username or password is wrong!'){
        return new CustomErrorHandler(401,message);
    }

    static unAuthorized(message='unAuthorized'){
        return new CustomErrorHandler(401,message);
    }

    static notfound(message='404 not found'){
        return new CustomErrorHandler(404,message);
    }

}
export default CustomErrorHandler;