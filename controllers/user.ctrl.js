const userService = require('../services/users.svc')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const mailerService = require('../services/mailer.svc');



const userCtrl = {
    register: async (req, res) => {
        try {
            const userInfo = await userService.getByEmail(req.body.email)
            if (userInfo) {
                res.status(400)
                res.send({ error: "user already exist" });
            }
            else {
                const hashedPassword = await bcrypt.hash(req.body.password, 5)
                req.body.password = hashedPassword;
                const user = await userService.add(req.body)
                res.status(201)
                res.send({ data: user })
            }

        } catch (error) {
            console.log(error)
            res.status(500);
            res.send({ error });


        }

    },
    login: async (req, res) => {
        try {
            const userInfo = await userService.getByEmail(req.body.email);
            if (userInfo) {
                const isMatch = await bcrypt.compare(req.body.password, userInfo.password);
                if (isMatch) {
                    const token = await jwt.sign({ email: userInfo.email, UserId: userInfo.UserId }, "you Can't steel my password", { expiresIn: '1h' });

                    res.status(200);
                    res.send({ data: userInfo, token })
                }
                else {
                    res.status(400)
                    res.send({ error: "password is incorrect" });
                }
            }
            else {
                res.status(409);
                res.send({ error: "user not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({ error });
        }
    },
    sendMail: async (res, req) => {
        const userInfo = await userService.getByEmail(req.body.email);
        try {


            if (userInfo) {
                const emailInfo = await mailerService(userInfo);
                res.status(200);
                res.send({ data: emailInfo });
            }
            else {
                res.status(409);
                res.send({ error: "user not found" });
            }
        }
        catch (error) {
            res.status(500);
            res.send({error})
        }

    },
    updatedPassword:async(req,res)=>{
        try{
            const userInfo = await userService.getByemail(req.body.email);    
            const previousPasswords= [...userInfo.previousPasswords,{password:userInfo.password,crreatedAt:userInfo.createdAt}];
            const hashedPassword = await bcrypt.hash(req.body.password, 5);
            req.body.password = hashedPassword;
            const updatedUserInfo = await userService.updatedPassword({...req.body,previousPasswords});
            res.status(200);
            res.send({data:updatedUserInfo});
        }catch(error){
            res.status(500);
            res.send({error})
        }
    }
   

};

module.exports = userCtrl;


// pikabic308@jzexport.com