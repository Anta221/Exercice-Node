const Post = require('../models/postModel');



exports.list_all_posts = (req, res) => {
    Post.find({}, (error, posts) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(posts)
        }
    })
}

exports.create_a_post = (req, res) => {
    let new_post = new Post(req.body);
    
    const axios = require('axios').default;
       axios({
        method: 'get',
        url: 'https://loripsum.net/api/plaintext'
      })
        .then(function (response) {
            new_post.content = response.data
            if(!new_post.content){
                console.log(new_post.content)
            }
        });
    new_post.save((error, post) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(201);
            res.json(post)
        }
    })
}

exports.get_a_post = (req, res) => {
    // Post.find({_id: req.params.post_id}, (error, post) => {
    Post.findById(req.params.post_id, (error, post) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(post)
        }
    })
}

exports.update_a_post = (req, res) => {
    Post.findByIdAndUpdate(req.params.post_id, req.body, {new: true}, (error, post) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(post)
        }
    })
}

exports.delete_a_post = (req, res) => {
    // Post.remove({_id: req.params.post_id}, (error, post) => {
    Post.findByIdAndRemove(req.params.post_id, (error, post) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json({message: "Article supprimé !"})
        }
    })
}