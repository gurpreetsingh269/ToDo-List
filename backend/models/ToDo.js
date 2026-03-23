const momgoose=require('mongoose');
const ToDoSchema=new momgoose.Schema({
    title:String,
    completed:{type:Boolean ,default:false},
    userId:String
});
module.exports=momgoose.model('ToDo',ToDoSchema);
