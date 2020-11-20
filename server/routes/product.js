const express = require('express');
const router = express.Router();
const passport = require('passport');
const Product = require('../models/product');
const multer = require('multer');
const BASE_URL = 'http://localhost:8000/product_images'
var fileExtension = require('file-extension');
var file_name = '';
var storage = multer.diskStorage({

  destination: function (req, file, cb) {
      cb(null, 'public/product_images')
  },

  // Setting name of file saved
  filename: function (req, file, cb) {
    file_name = file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname);
    cb(null, file_name)
  }
})
var upload = multer({
  storage: storage,
  limits: {
      fileSize: 2000000
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          cb(new Error('Please upload JPG and PNG images only!'))
      }
      cb(undefined, true)
  }
})
// get all
router.get('/', (req, res, next) => {
  let response = {success: true};
  Product.getAllProduct((err,products) => {
      if(err||products == null) {
          response.success = false;
          response.msg = "There was an error on getting the Products";
          res.json(response)
      }else{
          response.msg = 'products got successfuly';
          response.products = products;
          res.json(response);
      }
  })
});

// get product
router.get('/:id',(req, res, next) => {
  console.log(req.params.id)
  let response = {success: true};
  Product.getProductById(req.params.id, (err, product) => {
    if (err) {
      response.success = false;
      response.msg = "There was an error on getting the product";
      res.json(response);
    } else {
      response.msg = "successfuly";
      response.product = product;
      res.json(response);
    }
  });
});
//save product

router.post('/', upload.single('img'),(req,res,next) => {
    let response = {success:true};
    let product = new Product(req.body);
    product.img = BASE_URL+'/'+file_name;
    Product.addProduct(product,(err,products) => {
        if(err){
            response.success = false;
            response.err = err
            res.json(response);
        }else{
            response.msg = "successfuly";
            response.products = products;
            res.json(response);
        }
    })
})
router.get('/delete/:id',(req,res,next)=>{
  console.log(req.params.id)
  Product.deleteOne({_id:req.params.id},(err)=>{
    if(err) return res.json({success:false});
    res.json({success:true})
  })
})
router.post('/update',upload.single('img'),(req,res,next) => {
  let response = {success:true};
  let product = new Product(req.body);
  if(file_name){
    product.img = BASE_URL+'/'+file_name;
  }
  Product.updateProduct(product,(err,products) => {
      if(err){
          response.success = false;
          response.err = err
          res.json(response);
      }else{
          response.msg = "successfuly";
          response.products = products;
          res.json({success:true});
      }
  })
})
module.exports = router;
