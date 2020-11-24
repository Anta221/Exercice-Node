const User = require('../models/userModel');
const jwt =require('jsonwebtoken');
exports.create_an_user = (req, res) => {
   let new_user = new User(req.body)

   new_user.save((error, user)=>{
       if (error) {
        res.status(500);
        console.log(error);
        res.json({message: "Erreur serveur."})   
       }
       else{
        res.status(201);
        res.json(user.email+" a bien été créer");
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