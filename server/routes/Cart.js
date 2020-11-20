const express = require('express');
const router = express.Router();
const passport = require('passport');
const { findOneAndDelete } = require('../models/cart');
const Cart = require('../models/cart');

// get all
router.get('/', (req, res, next) => {
  let response = {success: true};
  Cart.find({},(err,carts) => {
      if(err) {
          response.success = false;
          response.msg = "There was an error on getting the Products";
          res.json(response)
      }else{
          response.msg = 'carts got successfuly';
          response.carts = carts;
          res.json(response);
      }
  })
});

// get product
router.get('/:token',(req, res, next) => {
  let response = {success: true};
  Cart.findOne({token:req.params.token}, (err, cart) => {
    if (err) {
      response.success = false;
      response.msg = "There was an error on getting the product";
      res.json(response);
    } else {
      response.msg = "successfuly";
      response.cart = cart;
      res.json(response);
    }
  });
});
//save product
router.delete('/:token',(req, res, next) => {
  let response = {success: true};
  Cart.deleteOne({token:req.params.token}, (err, cart) => {
    if (err) {
      response.success = false;
      response.msg = "There was an error on getting the product";
      res.json(response);
    } else {
      response.msg = "successfuly";
      response.cart = cart;
      res.json(response);
    }
  });
});
router.post('/',async (req,res,next) => {
  let response = {success:false};
  Cart.deleteOne({token:req.body.token},function () {
    console.log(req.body)
    Cart.addNewCart(req.body,(err,cart) => {
        if(err){
          return res.json(response);
        }else{
          response.success = true;
          response.cart = cart;
          return res.json(response);
        }
    })
  });
})
router.put('/',async (req,res,next) => {
  let response = {success:false};
  Cart.findOne({token:req.body.token},(err,cart)=>{
    if(err) return res.json({success:false});
      cart.cart.push(JSON.parse(req.body.item));
    Cart.AddToCart({token:req.body.token,cart:cart.cart},(err,cart) => {
      if(err){
        return res.json(response);
      }else{
        response.success = true;
        response.cart = cart;
        return res.json(response);
      }
    });
  })
})
module.exports = router;
