const model = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationEmail, validateLength, validateUserName} = require('../helper/validation');
const { generatetoken } = require('../helper/token');
const register = async(req,res) =>{
    console.log(req.body);
    try {
        const {
            first_name,
            last_name,
            email,
            password,
            username,
            bYear,
            bMonth,
            bDay,
            gender
        } = req.body
        if(!validationEmail(email)){
            return res.status(400).send({msg:"Enter the valide email"})
        }
        const check = await model.findOne({email:email});
        if(check){
            return res.status(400).send({msg:"Email already Exist!"})
        }
        if(validateLength(first_name,3,30)){
            return res.status(400).send({
                msg:"First Name must be between 3 and 30 character"
            })
        }
        if(validateLength(last_name,3,30)){
            return res.status(400).send({
                msg:"Last Name must be between 3 and 30 character"
            })
        }
        if(validateLength(password,6,40)){
            return res.status(400).send({
                msg:"Password must be atleast 6 character"
            })
        }
        const cryptedPassword = await bcrypt.hash(password,10);
        const tempUsername = first_name + last_name;
        let newUserName = await validateUserName(tempUsername);

        const user = new model({
            first_name,
            last_name,
            email,
            username:newUserName,
            password:cryptedPassword,
            bYear,
            bMonth,
            bDay,
            gender
        })
        await user.save();
        // const emailVerificationToken = generatetoken({
        //     id:user._id.toString()
        // },"30m");
        const token = generatetoken({id:user._id.toString()},"7d");
        return res.send({
            id:user._id,
            username:user.username,
            picture:user.picture,
            first_name:user.first_name,
            last_name:user.last_name,
            token:token,
            Verfied:user.Verfied,
            msg:"Register Success"
        })
        // return res.send(emailVerificationToken)
    } catch (error) {
        res.status(500).json({msg:"user not created",error:error.message})
    }
}

const login = async(req,res) =>{
    console.log(req.body)
    try {
        const {email,password} = req.body;
        const user = await model.findOne({email});
        if(!user){
            return res.send({msg:" No user found"});
        }
        console.log(user);
        const check = await bcrypt.compare(password,user.password);
        console.log(check);
        if(!check){
            return res.status(400).send({msg:
            "Invalid credentials.Please try again."})
        }
        const token = generatetoken({id:user._id.toString()},"7d");
        return res.send({
            id:user._id,
            username:user.username,
            picture:user.picture,
            first_name:user.first_name,
            last_name:user.last_name,
            token:token,
            Verfied:user.Verfied,
            msg:"Register Success"
        })
    } catch (error) {
        res.status(500).send({err: error});
    }
}


const activateAccount = async(req,res) =>{
    
    try {
        const validId = req.user.id;
        console.log(validId);
        const {token} = req.body;

        const user =  jwt.verify(token,process.env.TOKEN_SECRET);
        // console.log(user);     
        if(validId !== user.id){
            return res.status(500).send({msg:"Your not allowed to use this link"});
        }   
        const check = await model.findById(user.id);
        if(check.Verfied === true){
            return res.status(400).send({msg:"This email is already verified"});
        }
        else{
            await model.findByIdAndUpdate(user.id,{Verfied:true});
            return res.status(200).send({msg:"Account has been activated successfully "});
        }
    } catch (error) {

        res.status(500).send({msg:error.message});
    }
}
const sendVerification = async(req,res) =>{
    try {
        const id = req.user.id;
        const user = await model.findById(id);
        if(user.Verfied === true){
            res.status(400).send({msg:"The account is already verified"});
        }
        const emailVerificationToken = generatetoken({
            id:user._id.toString()
        },'50m')
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`
    // sendVerificationToken(user.email,user.first_name,url)
    // temporary
    return res.status(200).send({msg:"Link send to email",activateLink: url});
    } catch (error) {
        return res.status(500).send({msg: error});
    }
}
module.exports = {
    register,
    login,
    activateAccount,
    sendVerification
}