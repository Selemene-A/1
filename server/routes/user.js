const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const log = require('../log');


// register
router.post('/register', (req, res, next) => {
  let response = { success: false };
  let newUser = new User(req.body);

  User.addUser(newUser, (err, user) => {
    if (err) {
      response.msg = err.msg || 'Failed to register user';
      console.log(err)
      res.json(err);

    } else {
      response.success = true;
      response.msg = 'User registered successfuly';
      response.user = user;
      console.log('[%s] registered successfuly', user.username);
      res.json(response);
    }
  });

});

router.post('/login', (req, res, next) => {
  let body = req.body;
  let response = { success: false };
  User.getUserByEmail(body.email).then( (user) => {
    if(user[0].password === body.password){
      response.success = true
      response.user = user[0];
      res.json(response);
    }else{
      res.json(response);
    }
  }).catch((err) => {
    res.json(response);
  });


});

router.post('/delete',(req,res,next)=> {
  User.deleteOne({ email:req.body.email }
    ,function(err){
      if(err) return res.json({success:false})
      return res.json({success:true});
    })
})

router.post('/update',(req,res,next) => {
  console.log(req.body)
  let response = {success:false};
  User.updateUser(req.body,(err,user) => {
    if(err){
      return res.json(response);
    }else{
      response.success = true;
      return res.json(response);
    }
  });
})
// user list
router.get('/',  (req, res, next) => {
  if(req.query.email){
    User.getUserByEmail(req.query.email).then(users => {
      let response = {
        success: true,
        users: users,
      }; 
      return res.json(response);
    }).catch(err => {
      return res.json({
        success:false,
        err:err
      });
    });
  }else{
    User.find({},(err,users)=> {
      if(err){
        return res.json({
          success:false,
          err:err
        });
      }else{
        let response = {
          success: true,
          users: users,
        }; 
        return res.json(response);
      }
    })
  }
});

module.exports = router;
