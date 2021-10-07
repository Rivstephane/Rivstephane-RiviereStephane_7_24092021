const db = require('../models/index');
const fs = require('fs'); //      donne accès aux différentes opérations lié au système de fichier
const xss = require('xss');

//      test

exports.createPost = (req, res, next) => { 
  const Post = {
    userid : xss(req.body.UserId),
    title : xss(req.body.title),
    content : xss(req.body.descriptif),
    username : xss(req.body.username),
    createdAt: new Date(),
    updatedAt: new Date()
    
  }
  db.post.create(Post)
    .then(post => {
      const message = `Le post a bien été créé.`
      res.json({ message, data: post })
    })
    .catch(error =>{
      const message =' post non ajouté, réessayez plus tard'
      res.status(500).json({message, data:error})
    })
};

exports.getAllPost = (req, res, next) => {
  db.post.findAll() 
  //methode "find()" renvoie le tableau contenant toutes les posts
  .then(posts => {res.status(200).json(posts)})
  .catch(error => {res.status(400).json({ error: 'post non trouver' })})
};

exports.getOnePost = (req, res, next) => {
  db.post.findOne({ 
     where :  {id : req.params.id } //{id : JSON.parse(req.body.sauce)}
  }) 
  //      cherche la post avec l'id demander
  .then(post => {res.status(200).json(post)})
  .catch(error => {res.status(400).json({ message: 'post non trouver' })})
};


exports.modifyPost = (req, res, next) =>{
//          Mise a jours de la bdd et supression de l'ancienne images si il y en as une
const postObject ={
  id: req.body.id,
  title : req.body.title,
  content : req.body.content
  }
  db.post.findOne({
    attributes: ['id','title', 'content'], 
     where :  {id : JSON.parse(postObject.id)}
  }) 
  //      cherche la post avec l'id demander
  .then(post => {
    post.update(postObject)
    .then(() => {res.status(200).json({ message: 'Objet modifié !'})})
    .catch(error => {res.status(400).json({ error: "erreur sur la modification de la post" })});
//   }
  })
  .catch(error => res.status(400).json({ error: 'post non trouver' }))
}; 

exports.deletePost = (req, res) => {
  const Post = {
    id : xss(req.body.id)
    
  }
  // on trouve le fichier avec son id
  db.post.findOne({
    where : {id : Post.id } 
  })//({ where : {id : req.body.id} })
  .then(post => {
    post.destroy({   
      id: Post.id //req.params.id
    })// on detrui les données lier a l' id
    .then(() => res.status(200).json({ message: 'Post supprimée !' }))
    .catch(error => res.status(400).json({ message: 'Post supprimée !', error }));
  })
  .catch(error => res.status(500).json({ error }));
};