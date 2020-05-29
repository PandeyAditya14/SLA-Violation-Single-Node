/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
const Joi = require('joi');
const express = require('express');
const cors = require('cors');
const app = express();
const Mongoose = require('mongoose');
const Bcrypt = require('bcrypt');
let network = require('./network.js');
var CircularJSON = require('circular-json');
var UserModel = require('./UserModel');
app.use(express.json());
app.use(cors());

// Mongo Db attach 
Mongoose.connect("mongodb://localhost/sla");
//Encryt using Bcrypt



const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-org1.json');


const walletPath = path.join(process.cwd(), 'wallet');
const wallet = new FileSystemWallet(walletPath);
console.log(`Wallet path: ${walletPath}`);



async function main() {
    var signedInUsers = [];
    var currentUser = '';
    var pass='';
    var secret = '';
    try {
        async function signIn() {
            let networkObj = await network.connectToNetwork(arguments[0])
            if (networkObj.error) {
                res.send(networkObj);
            }
            var index = signedInUsers.indexOf(arguments[0]);
            if(index > -1) {
                console.log(`${arguments[0]} already signed in`);
                return 2;
            } else {
                console.log(`${arguments[0]} signed in`)
                return 1;
            }
        }

        async function signOut() {
            console.log(`${currentUser} signed out`);
            var index = signedInUsers.indexOf(currentUser);
            if (index > -1) {
                signedInUsers.splice(index, 1);
            }
            currentUser = '';
        }
        
        var user = new UserModel({
            username:"admin",
            password:"admin",
            email:"admin@example.com",
            type:0
        })
        
        var result = await user.save()
        
        if(!result){
            console.log("!!!! ADMIN NOT REGISTERED !!!")
        }
        

        app.get('/',(req,res) => {
            res.send('This is root');
        });

        app.post('/register',async function(req,res) {
            var userId = req.body.username;
            var type=req.body.type;
            var store_success = false;
            // Store User In MongoDB
            try {
                var user = new UserModel(req.body);
                var result = await user.save();
                store_success = true;
            } catch(err ){
                res.status(400).send({message: "FAILED TO REGISTER USER ON DB"});
            }

            let response = await network.registerUser(userId,type);
            console.log('response from registerUser: ');
            console.log(response);
            if (response.error) {
                res.send(response.error);
            } else {
                let networkObj = await network.connectToNetwork(userId);
                if (networkObj.error) {
                res.send(networkObj.error);
                }
                let args = [JSON.stringify(req.body)];
                console.log('before invoke')
                let invokeResponse = await network.invoke(networkObj, false, 'createUser',args);
                console.log("after");
                if (invokeResponse.error) {
                res.send(invokeResponse.error);
                } else {

                console.log('after network.invoke ');
                var response1 = {
                    data: userId,
                    resStatus: 'success'
                }
                // Implement Register of USer on Mongo Store Encrypted Password if Success Full Send response

                res.json(response1);
        }
        }
        });
        
        app.get('/viewTransaction',async function(req,res) {
            console.log('from view',currentUser)
            let networkObj = await network.connectToNetwork(currentUser);
            let response = await network.invoke(networkObj, true, 'queryLog', currentUser);
            let parsedResponse = await JSON.parse(response);
            console.log(parsedResponse);
            res.send(parsedResponse);
        });

        app.post('/signin',async function(req,res) {
            var userId = req.body.username;
            // Take user password create hash using bcrypt
            
            var pass=req.body.password;
            var success_db = false;
            try{
                var user = await UserModel.findOne({username:userId}).exec();
                if(!user){
                    return res.status(400).send({ message: "The user does not exist" });
                }
                user.comparePassword(pass , (err , match) => {
                    if(!match){
                        return res.status(400).send({ message: "The password is invalid" });
                    }
                    else{
                        success_db =true;
                        
                    }
                });


            }catch(err){
                res.status(400).send({message:"Some Error Occured During Login on the Back End "});
            }
            if(success_db){
                var stat=await signIn(userId);
            }
            console.log(stat);
            //Check Login Here for Password and then edit the if else blocks

            if(stat==1) {
                currentUser=userId;
                signedInUsers.push(currentUser);
		    var response_sign = {
                    userName: currentUser,
                    resStatus: 'success'
                }
                res.json(response_sign)
            }else if(stat==0) {
                console.log("h");
                res.status(400).send({message:`User "${userId}" does not exists!!!\nPlease register first!!`})
            }else if(stat==2) {
                res.status(400).send({message: `User "${userId}" already logged in!!`})
            }
        });

        app.get('/signout', async function(req, res) {
            await signOut();
            res.json("Signed out");
        });
       
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

app.listen(3001, () => {
    console.log('server is running on port 3001')
})

main();

