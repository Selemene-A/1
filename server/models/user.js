const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// user schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type:String,
    required:true,
    default:'user'
  },
  email:{
    type:String,
    required:true,
    unique: true
  },
  user_token:{
    type:String,
    required:true,
    default:''
  },
  cart:{
    type:Array,
    default:[
      
    ]
  }
});

UserSchema.statics.getUserById = function(id, callback) {
  User.findById(id, callback);
}

UserSchema.statics.getUserByEmail = function(email, callback) {
  let query = {email: email};
  return User.find(query);
}
UserSchema.statics.updateUser = function (user ,callback) {
   let up_user= {
     name:user.name,
     email:user.email
   } 
   if(user.password){
     up_user.password = user.password
   }
  User.findOneAndUpdate({_id:user._id},up_user,callback);
}
UserSchema.statics.getUsers = () => {
  return User.find({}, '-password');
}

UserSchema.statics.addUser = function(newUser, callback) {
  newUser.save(callback);
};

UserSchema.statics.authenticate = function(email, password, callback) {
    User.find({email:email}, (user) => {
      return callback(user);
      // if (err) return callback({msg: "There was an error on getting the user"});
      // if (!user) {
      //   let error = {msg: "Wrong username or password"};
      //   return callback(error);
      // } else {
      //   bcryptjs.compare(password, user.password, (err, result) => {
      //     if (result == true) {
      //       return callback(null, user);
      //     } else {
      //       let error = {msg: "Wrong username or password"};
      //       return callback(error);
      //     }
      //   });
      // }
    });
};


const User = mongoose.model('User', UserSchema);
module.exports = User;
