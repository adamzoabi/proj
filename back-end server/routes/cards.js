const express = require('express');
const _ = require('lodash');
const { User, validate, validateCards, validateFavs } = require('../models/user');
const { Card, validateCard, generateBizNumber } = require('../models/card');
const auth = require('../middleware/auth');
const router = express.Router();

router.delete('/:id', auth, async (req, res) => {
  const card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  if (card) {
    await card.remove();
    res.json({ message: "card deleted" });
    
  } else {
    res.status(404);
    throw new Error("card not Found");
  }  
});


router.get('/my-cards', auth, async (req,res) => {
  if(!req.user.biz) {
    return res.status(401).send("Access denied.");
  }
  const cards = await Card.find({ user_id: req.user._id});
  res.send(cards);
})

router.get('/fav-cards', auth, async (req,res) => {
  if(!req.user.biz) {
    return res.status(401).send("Access denied.");
  }
  const user = await User.find({fav:req.fav},function(err,cards) {
    if (err) {res.send('something went wrong'); 
    next();
  }
  res.json(cards);
  });
})



router.get('/all-cards', auth, async (req,res) => {
  if(!req.user.biz) {
    return res.status(401).send("Access denied.");
  }
  const card = await Card.find({},function(err,cards) {
    if (err) {res.send('something went wrong'); 
    next();
  }
  res.json(cards);
  });
})








router.get('/:id', auth, async (req, res) => {

  const card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  if (!card) return res.status(404).send('The card with the given ID was not found.');
  res.send(card);

});

router.post('/', auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let card = new Card(
    {
      
      bizName: req.body.bizName,
      bizDescription: req.body.bizDescription,
      bizAddress: req.body.bizAddress,
      bizPhone: req.body.bizPhone,
      bizImage: req.body.bizImage ? req.body.bizImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      bizNumber: await generateBizNumber(Card),
      user_id: req.user._id
    }
  );

  post = await card.save();
  res.send(post);

});

/*router.put('/:id', auth, async (req, res) => {

  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = await Card.findOneAndUpdate({ _id: req.params.id, user_id: req.user._id }, req.body);
  if (!card) return res.status(404).send('The card with the given ID was not found.');

  card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(card);

});

*/
router.put('/:id', auth, async (req, res) => {
  const {bizName,bizDescription,bizAddress,bizPhone,bizImage,bizNumber}=req.body;
  const card = await Card.findById({ _id: req.params.id });
  if (card) { 
    card.bizName=bizName || card.bizName;
    card.bizDescription=bizDescription || card.bizDescription;
    card.bizPhone=bizPhone || card.bizPhone;
    card.bizImage=bizImage || card.bizImage;
    card.bizNumber=bizNumber || card.bizNumber;
    card.bizAddress=bizAddress || card.bizAddress;
    const updatedCard= await card.save();
  res.json(updatedCard);
  }else{
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = router; 