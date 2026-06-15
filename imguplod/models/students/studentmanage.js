const mongoose=require('mongoose');

const schema=mongoose.Schema({
    rno:Number,
    name:String,
    picture:String
    
    
})

const Studentmodel=mongoose.model('student',schema);

module.exports=Studentmodel;