const db = require('../models/index');
const fs = require('fs'); //      donne accès aux différentes opérations lié au système de fichier
const xss = require('xss');

//      test

exports.createPost = (req, res, next) => { 
  console.log(req.body)
  const Post = {
    userId : xss(req.body.UserId),
    title : xss(req.body.title),
    description : xss(req.body.descriptif),
    createdAt: new Date(),
    updatedAt: new Date()
    
  }
  console.log(Post)
  db.post.create(Post)
    .then(post => {
      console.log("1")
      const message = `Le post a bien été créé.`
      res.json({ message, data: post })
    })
    .catch(error =>{
      console.log("2")
      const message =' post non ajouté, réessayez plus tard'
      res.status(500).json({message, data:error})
    })
};

exports.getAllPost = (req, res, next) => {
  db.joke.findAll({
    attributes: ['id','idUsers','title', 'imageUrl', 'description','createdAt','updatedAt'], 
  }) 
  //methode "find()" renvoie le tableau contenant toutes les jokes
  .then(jokes => res.status(200).json(jokes))
  .catch(error => res.status(400).json({ message: 'joke non trouver' }))
};

exports.getOnePost = (req, res, next) => {
  db.post.findOne({
    attributes: ['id','idUsers','title', 'imageUrl', 'description','createdAt','updatedAt'], 
     where :  {id : "2" } //{id : JSON.parse(req.body.sauce)}
  }) 
  //      cherche la post avec l'id demander
  .then(post => res.status(200).json(post))
  .catch(error => res.status(400).json({ message: 'post non trouver' }))
};


exports.modifyPost = (req, res, next) =>{
//          Mise a jours de la bdd et supression de l'ancienne images si il y en as une
const postObject ={
  idUsers : idUsers,
  title : "title",
  imageUrl : "--test--",
  description : "description"
  } /*req.file ?
    {
        ...JSON.parse(req.body.post),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };*/
    // on trouve le fichier avec son id
  db.post.findOne({
    attributes: ['id','idUsers','title', 'imageUrl', 'description'], 
     where :  {id : "4" } //{id : JSON.parse(req.body.sauce)}
  }) 
  //      cherche la post avec l'id demander
  .then(post => {
//    if (req.file){
//      const filename = post.imageUrl.split('/images/')[1];
//      fs.unlink(`images/${filename}`, () => {
//        post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
//        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//        .catch(error => res.status(400).json({ error }));
//      });
      
//    }else{
    post.update(postObject)//({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error: "erreur sur la modification de la post" }));
//   }
  })
  .catch(error => res.status(400).json({ error: 'post non trouver' }))
}; 

exports.deletePost = (req, res) => {
  // on trouve le fichier avec son id
  db.post.findOne({
    attributes: ['id'], 
    where : {id : "4" } 
  })//({ where : {id : req.body.id} })
  .then(post => {
    post.destroy({   
      id: "4" //req.params.id
    })// on detrui les données lier a l' id
    .then(() => res.status(200).json({ message: 'Post supprimée !' }))
    .catch(error => res.status(400).json({ message: 'Post supprimée !', error }));
  })
  .catch(error => res.status(500).json({ error }));
};