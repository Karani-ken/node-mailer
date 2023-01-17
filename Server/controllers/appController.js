import userModel from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import ENV from '../config.js'

/**middleware for verifying user */

export async function verifyUser(req, res, next){
    try{
        const {username} = req.method == "GET" ? req.query : req.body;
        //check the user existance
        let exist = await userModel.findOn({username});
        if(!exist) return res.status(404).send({error:"User not found!!!"});
        next();
    } catch(error){
        return res.status(404).send({error: "Authenitication Error!!!"});
    }
}
/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/

export async function register (req, res){
    try{
        const {username, password, profile, email}= req.body;
        //check existing username
        const existUsername = new Promise((resolve, reject)=>{
            userModel.findOne({username}, function(err, user){
                if (err) reject(new Error(err))
                if(user) reject({error: "User name alreadt Taken"})

                resolve();
            })
        });
        //check existing email
        const existEmail = new Promise((resolve, reject)=>{
            userModel.findOne({email}, function(err, email){
                if (err) reject(new Error(err))
                if(email) reject({error: "Email is in use"})

                resolve();

            })
        });

        Promise.all([existUsername, existEmail])
        .then(()=>{
            if(password){
                bcrypt.hash(password, 10)
                .then(hashedPassword =>{
                         const user = new userModel({
                            username,
                            password: hashedPassword,
                            profile: profile || '',
                            email
                         });

                         // return save result as response
                         user.save()
                            .then(result => res.status(201).send({msg:"User Registered Successfully"}))
                            .catch(error => res.status(500).send({error}))
                }).catch(error =>{
                    return res.status(500).send({
                        error: " Enable to hashed password"
                    })
                })

            }

        }).catch(error =>{
            return res.status(500).send({error})
        })

    }catch(error){
        return res.status(500).send(error)
    }
}
/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/

export async function login (req, res){
    const {username, password} = req.body;     

    try{
        userModel.findOne({username})
        .then(user=>{
            bcrypt.compare(password, user.password)
            .then(passwordCheck =>{
                if(!passwordCheck) return res.status(400).send({error: "Don't have password"})
                //create jwt token
               const token = jwt.sign({
                   userId : user._id,
                   username: user.username 
                }, ENV.JWT_SECRET, {expiresIn : "24hr"});

                return res.status(200).send({
                    msg: "Login Successful...!",
                    username: user.username,
                    token
                })
                




            })
        })
    }catch(error){
        return res.status(400).send({error})
    }
    
}
/** GET: http://localhost:8080/api/user/example123 */
export async function getUser (req, res){
    const { username } = req.params;

    try{    
        if(!username) return res.status(501).send({error: "Invalid Username"})

        userModel.findOne({username}, function(err, user){
            if(err) return res.status(500).send({err});
            if(!user) return res.status(501).send({error : "User not found"}); 
            //remove pasword from user
            const {password, ...rest} = Object.assign({}, user.toJSON());
            return res.status(201).send(rest)
        })
    } catch (error){
        return res.status(404).send({error: "User Data not found!!!"})
    }

}
/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res){
    try{
        const id = req.query.id;

        if(id){
            const body = req.body
            //update the data
            userModel.updateOne({_id : id}, body, function(err, data){
                if(err) throw err;

                return res.status(201).send({msg:" Record Updated ...!"})
            })
        }

    }catch (error){
        return res.status(401).send({error : "User Not Found!!!"});
    }
}
/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP (req, res){
    res.json('generateOTP route')
}
/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res){
    res.json('verifyOTP route')  
}
// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */

export async function createResetSession (req, res){
    res.json('createResetSession route')
}
// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword (req, res){
    res.json('resetPassword route')
}

