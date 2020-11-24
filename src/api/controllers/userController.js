const User = require('../models/userModel');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require("email-validator");
 

exports.create_an_user = (req, res) => {
   let new_user = new User(req.body)
   new_user.save((error, user)=>{
       if (error) {
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."})   
       }
       else{
           let verif_email = validator.validate(user.email)
            if(verif_email === true){
                bcrypt . hash ( user.password ,  10 ,  function ( err , hash )  {
                    if (error) {
                        res.status(500);
                        console.log(error);
                        res.json({message: "Erreur lors du hachage password."})   
                    } else{
                        user.password = hash
                        res.status(201);
                        res.json(user);

                    }
                });
            }else{
                res.status(500);
                console.log(error);
                res.json({message: "adresse email non valide"})   
            } 
        
      }
   })
}

exports.login_an_user = (req, res) => {
    
    User.findOne({email: req.body.email}, (error, user) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."})   
           }
           else{
            res.status(201);
            if (user.password === req.body.password){
                jwt.sign({
                    email: user.email
                },process.env.SECRET, {expiresIn: '30 days'}, 
                (error, token) => {
                    if (error) {
                        res.status(400);
                        console.log(error);
                        res.json({message: "Mot de passe ou email erroné."})   
                    }
                    else{
                       res.json({token}); 
                    }

                } )
            }
            else{
                res.status(400);
                console.log(error);
                res.json({message: "Mot de passe ou email erroné."})   
            }
          }
    })
}