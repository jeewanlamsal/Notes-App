
const mongoose=require('mongoose');

const noteSchema=new mongoose.Schema({
    text:{ type:String, required:true},
    completed: { type:Boolean, default:false},
    user:{
     type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: false
    },
    createdAt: {type: Date, default: Date.now}
});
module.exports=mongoose.model('Note', noteSchema);