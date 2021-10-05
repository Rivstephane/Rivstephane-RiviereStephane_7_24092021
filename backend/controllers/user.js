require('dotenv').config();
const xss = require('xss');
const db = require('../models/index');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs'); //      donne accès aux différentes opérations lié au système de fichier
var passwordValidator = require('password-validator');

// Create a schema
var schema = new passwordValidator();
 
// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(50)                                  // Maximum length 100
.has().uppercase(1)                              // Must have uppercase letters
.has().lowercase(1)                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

exports.signup = (req, res, next) => {
  console.log(req.body);
  const User = ({
    //      filtrer les entrées des utilisateurs afin d'empêcher les attaques XSS
    email : xss(req.body.email),
    username : xss(req.body.username),
    bio : xss(req.body.bio),
    password : xss(req.body.password),
    isAdmin: xss(req.body.isAdmin)
  });
  //      recherche dans la bdd de l'utilisateur grace a son id 
  db.user.findOne({where : { email: User.email }})
    .then(user => {
      console.log(User);
      if (!user) {
        console.log(User);
        if (!schema.validate(User.password)) {
          res.status(401).json({message:"Sécurité du mot de passe faible. Il doit contenir au moins 8 caractère, 1 majuscules, 1 minuscule et deux chiffres"})
        }
        //      hash du mdp
        bcrypt.hash(User.password, 10)
          .then(hash => {
            console.log("1");
            //      instanciation d'un nouvelle utilisateur
            User.password = hash;
            console.log(user);
          //      creation d'un nouvelle utilisateur dans la bdd
          db.user.create(User)
            .then(
              data => {
              console.log("4"),
              res.status(201).json({ message: 'Utilisateur créé !' })})
            .catch(error => {
              console.log(2),
              res.status(400).json({ error: 'Erreure creations utilisateur !' })
            });
          })
          .catch(error => {
            console.log(2);
            res.status(500).json({ error: 'Erreure hash mots de passe'})
          });
      }
      else{
        return error= "utilisateur esitant";
      }
    })
    .catch(error => res.status(500).json({ error: "Conexion serveur echouée !"}));
};

exports.login = (req, res, next) => {
  console.log(req.body);
  const userreq = ({
    email : xss(req.body.email),
    password : xss(req.body.password),
  });
  console.log(userreq);
  //      recherche dans la bdd de l'utilisateur grace a son mail 
  db.user.findOne({ where : { email : userreq.email }})
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      };
      console.log("1");
      //      Comparaison des mots de passe
      bcrypt.compare(userreq.password, user.password)
        .then(valid => {
          console.log("2");
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          //      renvoie de l'id utilisateur ci il est un admin est les autres info dans un token
          res.status(200).json({
            userId: user.id,
            userName: user.username,
            isAdmin: user.isAdmin,
            bio: user.bio,
            token: jwt.sign(
              { userId: user.id, userName: user.username, isadmin: user.isAdmin, bio: user.bio,},
              `${process.env.RANDOM_TOKEN_SECRET}`,
              { expiresIn: '12h' }
            )
          });
        })
      .catch(error => {console.log("3"), res.status(500).json({ error: "Comparaison mots de passe echouée" })});
    })
    .catch(error => {console.log("4"), res.status(500).json({ error: "Conexion server echouée !"})});
};
exports.getOneUser = (req, res, next) => {
  console.log(req.params);
  //      recherche dans la bdd de l'utilisateur grace a son id 
  db.user.findOne({
    where : { id : req.params.id }})
    .then(user => {
      console.log(user);
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      };
      res.status(200).json({
        userId: user.id,
        email: user.email,
        username: user.username,
        bio: user.bio,
        isAdmin: user.isAdmin,
      })
    })
    .catch(error => res.status(500).json({ error: "Conexion serveur echouée !"}));
};
  
exports.getAllUser = (req, res, next) => {
  console.log("1")
  db.user.findAll({
    attributes: ['id','email','username', 'bio', 'isAdmin'], 
  }) 
  //      methode "findAll()" renvoie le tableau contenant toutes les user  Attention demande reservé au Admin
  .then(users => {
    console.log(users),
    res.status(200).json(users)})
  .catch(error => {
    console.log("3"),res.status(400).json({ error: "Erreure serveur" })})
};

exports.deleteUser = (req, res) => {
  console.log(req.body.id);
  //      recherche dans la bdd de l'utilisateur grace a son id 
  db.user.findOne({
    where : {id : req.body.id} })// on trouve le fichier avec son id
  .then(post => {
    console.log("1")
    //      on detrui les données lier a l' id
    post.destroy({   
      id: req.body.id
    })
  .then(() => {
    console.log("2"),
    res.status(200).json({ message: 'User supprimée !' })})
  .catch(error => {
    console.log("3"),
    res.status(400).json({ message: 'User non supprimée !', error })});
  })
};

exports.updateUserPassword = (req, res, next) => {
//      recherche de l'utilisateur
  db.user.findOne({ where : {id : "12" } })
  .then(user => {    
    //      verification de l'ancien mots de passe  
    bcrypt.compare(passWord, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
      }
      //      hash du nouveau mots de passe
      bcrypt.hash(newPassWord, 10)
      .then(hash => {
        const passWord = hash;
        //      modification dans la bdd
        db.user.update( { password : passWord } , { where : {id : "12" } })
        .then(() => res.status(200).json({ message: 'Mdp modifié !' }))
        .catch(error => res.status(400).json({ error: 'Mdp non modifié !' }));
      })
      .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
  })
  .catch(error => res.status(500).json({ error }))
};

exports.updateUser = (req, res, next) => {
  //      recherche dans la bdd de l'utilisateur
  db.user.findOne({ where : {id : "12" } })
  .then(user => {
    //      modification des données non essentiel de l'utilisateur 
    db.user.update( { bio : bio } , { where : {id : "12" } })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ message: 'Objet non modifié !', error }));
  })
  .catch(error => res.status(500).json({ error }))
};