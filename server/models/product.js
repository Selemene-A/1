const mongoose = require('mongoose');

// message schema
const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    default:' '
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  img: {
    type: String,
    required: false,
    default: ' '
  },
});

ProductSchema.statics.addProduct = (product, callback) => {
  product.save(callback);
};

ProductSchema.statics.getAllProduct = (callback) => {
  Product.find({}, callback);
};

ProductSchema.statics.getProductById = (_id, callback) => {
    Product.findOne({_id: _id}, callback);
};
ProductSchema.statics.updateProduct = (product, callback) => {
    Product.findByIdAndUpdate({_id:product._id},product,callback);
};
  
ProductSchema.statics.deleteProduct = (_id, callback) => {
   console.log('delpro',_id);
};
    


const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
