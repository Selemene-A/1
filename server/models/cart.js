const mongoose = require('mongoose');

// message schema
const CartSchema = mongoose.Schema({
    token:{
        type:String,
        required:true,
    }, 
    cart: {
        type: Array, 
        'default': [

        ]
    }
});
CartSchema.statics.addNewCart = (cart, callback) => {
    cart.cart = JSON.parse(cart.item)
    let new_cart = new Cart(cart);
    new_cart.save(callback);
};
CartSchema.statics.AddToCart = (cart,callback) => {
    Cart.findOneAndUpdate({token:cart.token},cart,callback);
}
const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
