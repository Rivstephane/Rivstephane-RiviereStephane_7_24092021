const db = require('../models/index');
const xss = require('xss');

exports.createMessage = (req, res, next) => { 
  const message = {
    userid: xss(req.body.userid),
    postid : xss(req.body.postid),
    username: xss(req.body.username),
    content : xss(req.body.content)
  };
    db.message.create(message)
    .then(data => {
      res.status(201).json({ message: 'message créé !' })})
    .catch(error => {
      res.status(400).json({ message: 'message non crée !', error })});
    };

exports.deleteMessage = (req, res, next) => {
  const message = xss(req.body.id);
  db.message.findOne({ 
    attributes: ['id'], 
    where : {id : message } 
  }) // on trouve le fichier avec son id
  .then(message => {
    message.destroy({ 
      id: message //req.params.id
    })
    // On passe un objet (id) correspondant au fichier à supprimer de la base
    .then(() => {res.status(200).json({ message: 'Message supprimé !'})})
    .catch(error => {res.status(400).json({ error: 'Erreure message non suprimé !' })});
  })
  .catch(error => {res.status(500).json({ error: 'Erreure sur la recherche de message !' })});
};

exports.getAllMessage = (req, res, next) => {
    db.message.findAll() 
    .then(messages => {res.status(200).json(messages)})
    .catch(error => {res.status(400).json({ error })})
};