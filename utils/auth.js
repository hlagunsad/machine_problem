const jwt = require('jsonwebtoken');
const {AuthenticationError} = require('apollo-server');
const privateKey = process.env.PRIVATE_KEY;

module.exports = (context) => {
    console.log(context.req.headers.authorization)
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user = jwt.verify(token, privateKey);
                return user;
            } catch(err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        } else {
            throw new Error("Authentication token must have Bearer <token>")
        }
    }else {
        throw new Error("Auth header is missing.")
    }
}