const mongoose = require('mongoose');

const Profile = new mongoose.Schema({
   name:{
      type:String,
      required:true
   },
   location:{
      type:String,
      required:true
   },
   img1:{
      data: Buffer,
      required: false
   },
   img2:{
      data: Buffer,
      contentType: String,
      required: false
   },
   img3:{
      data: Buffer,
      contentType: String,
      required: false
   },
   carType:{
      type:String,
      required:false
   },
   make:{
      type:String,
      required:true
   },
   model:{
      type:String,
      required:false
   },
   interests:{
      type:String,
      required:false
   },
   email:{
      type:String,
      required:false
   },
   date:{
      type:Date,
      default:Date.now
   },
   password:{
      type:String,
      required:true
   },
   mode:{
      type:String,
      required:false
   },

   year:{
      type:String,
      required:false
   }
});

module.exports = mongoose.model('Users', Profile);          