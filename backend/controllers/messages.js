const db = require('../models/index');
const xss = require('xss');

exports.createMessage = (req, res, next) => { 
  console.log(req.body)
  const message = {
    userid: xss(req.body.userid),
    postid : xss(req.body.postid),
    username: xss(req.body.username),
    content : xss(req.body.content)
  };
  console.log(message)
    db.message.create(message)
    .then(data => {
      console.log("1")
      res.status(201).json({ message: 'message créé !' })})
    .catch(error => {
      console.log("2")
      res.status(400).json({ message: 'message non crée !', error })});
    };

exports.deleteMessage = (req, res, next) => {
  console.log(req.body)
  const message = xss(req.body.id);
  console.log(message)
  db.message.findOne({ 
    attributes: ['id'], 
    where : {id : message } 
  }) // on trouve le fichier avec son id
  .then(message => {
    message.destroy({ 
      id: message //req.params.id
    })
    // On passe un objet (id) correspondant au fichier à supprimer de la base
    .then(() => {console.log("132"),res.status(200).json({ message: 'Message supprimé !'})})
    .catch(error => {console.log("465"),res.status(400).json({ error: 'Erreure message non suprimé !' })});
  })
  .catch(error => {console.log("45"),res.status(500).json({ error: 'Erreure sur la recherche de message !' })});
};

exports.getAllMessage = (req, res, next) => {
  console.log("12")
    db.message.findAll() 
    .then(messages => {console.log(messages),res.status(200).json(messages)})
    .catch(error => {console.log("error"),res.status(400).json({ error })})
};