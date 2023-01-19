/**authentication middleware */

export default async function Auth(req, res, next){
    try{
        //access authorization header to validate request

        const token = req.headers.authorization;
        req.json(token);
    }catch(error){
        res.status(401).json({error:"Authentication Failed"})
    }
}