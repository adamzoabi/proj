const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate, validateCards, validateFavs } = require('../models/user');
const { Card, validateCard, generateBizNumber } = require('../models/card');
const auth = require('../middleware/auth');
const router = express.Router();

const getCards = async (cardsArray) => {
  const cards = await Card.find({ "bizNumber": { $in: cardsArray } });
  return cards;
};


const getfavs = async (cardsArray) => {
  const card = await Card.findOne({ _id: req.params.id });
  if (!card) return res.status(404).send('The card with the given ID was not found.');
  res.send(card);
  };


  router.get('/Favorites-cards', auth, async (req,res) => {
  
    if(!req.user.biz) {
      return res.status(401).send("Access denied.");
    }
    const users = await User.find({_id: req.user._id},{favs:1});
    if (users){
          res.send(users);
    }
    else {
      res.status(404);
      throw new Error("card not Found");
    }  
  
  })
  router.delete('/:id', auth, async (req, res) => {
    const card = await User.findOne( {_id:  req.params.id},{favs:1});
    if (card) {
      await card.remove();
      res.json({ message: "card deleted" });
      
    } else {
      res.status(404);
      throw new Error("card not Found");
    }  
  });
  

  router.post('/:id',auth, async (req, res) => {
   // const cardid = req.params.id;
    const card = await Card.findOne({ _id: req.params.id});
 if (!card) {
     res.status(404).send('The card with the given ID was not found.');
} 



//else
//{
const user = await User.findById(req.user._id);
let card1 = await User.findOne({ _id: req.params.id });
if (card1) return res.status(400).send('card already in favs.');

 if (user) {
    
      user.favs.push(card);
       await user.save();
       res.status(201).json({ message: "Favorites Added" });
       
    } else {
      res.status(404);
      throw new Error("user not logged in,you have to sign in");
    }  


//if (User.findById({_id: {"$in":req.params.id}},{favs:1}))
 /*if(card._id=user.favs._id){
  
      res.status(400);
      throw new Error("card already in Favorites"); 
    }*/

  

  
   /* const { error } = validateCards(req.body);
    if (error) res.status(400).send(error.details[0].message);
    let user = await User.updateOne({_id : req.user._id},{ $push: { favs:req.body._id}});
    if (!user) return res.status(400).send('no user signed in');
    if(user) {
    await user.save();
    res.send(user);
    }*/
  
  
  });
router.patch('/cards', auth, async (req, res) => {

  const { error } = validateCards(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const cards = await getCards(req.body.cards);
  if (cards.length != req.body.cards.length) res.status(400).send("Card numbers don't match");

  let user = await User.findById(req.user._id);
  user.cards = req.body.cards;
  user = await user.save();
  res.send(user);

});
router.get('/cards', auth, async (req, res) => {

  if (!req.query.numbers) res.status(400).send('Missing numbers data');

  let data = {};
  data.cards = req.query.numbers.split(",");

  const cards = await getCards(data.cards);
  res.send(cards);

});




router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'biz', 'cards']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ['_id', 'name', 'email']));

});




module.exports = router; 