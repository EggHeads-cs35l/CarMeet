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
      required:true
   },
   carBrand:{
      type:String,
      required:true
   },
   carModel:{
      type:String,
      required:true
   },
   interests:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true
   },
   date:{
      type:Date,
      default:Date.now
   },
   password:{
      type:String,
      required:true
   },
});

module.exports = mongoose.model('Users', Profile);          