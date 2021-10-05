const db = require('../models/index');
const fs = require('fs'); //      donne accès aux différentes opérations lié au système de fichier
const xss = require('xss');

//      test
const userId = "1";  //(req.body.userId)
const title = "test2";  //(req.body.title)
const postId = "5";  //(req.body.postId)
const content = "je suis la";  //(req.body.content)

exports.createMessage = (req, res, next) => {
  const message = {
    userId: userId,
    title : title,
    postId : postId,
    content : content
  };
    db.message.create(message)
    .then(data => {res.status(201).json({ message: 'message créé !' })})
    .catch(error => res.status(400).json({ message: 'message non crée !', error }));
  };

exports.deleteMessage = (req, res, next) => {
  db.message.findOne({ 
    attributes: ['id'], 
    where : {id : "3" } 
  }) // on trouve le fichier avec son id
  .then(message => {
    message.destroy({ 
      id: "3" //req.params.id
    })
    // On passe un objet (id) correspondant au fichier à supprimer de la base
    .then(() => res.status(200).json({ message: 'Message supprimé !'}))
    .catch(error => res.status(400).json({ error: 'Erreure message non suprimé !' }));
  })
  .catch(error => res.status(500).json({ error: 'Erreure sur la recherche de message !' }));
};

exports.getAllMessage = (req, res, next) => {
    db.message.findAll() 
    //methode "find()" renvoie le tableau contenant toutes les messages
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error }))
};

exports.getMessage = (req, res, next) => {
    db.message.findAll({ 
      attributes: ['id', 'userId',"postId", 'title', 'content','createdAt','updatedAt'],
      where :  {postId : "1" } //{postId : JSON.parse(req.body.post.id)}
    }) 
    //methode "find()" renvoie le tableau contenant toutes les messages
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error }))
};