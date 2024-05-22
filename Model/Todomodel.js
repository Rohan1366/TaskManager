const mongoose=require("mongoose");

const Todoschema=mongoose.Schema({
    title : String,
    desc : String,
    date : String,
    priority:String,
    status:String,
    progress:Number,
    user_id:String,
    maker:String,
    liable:Array,
    count:Array

});

const Todomodel=mongoose.model("todo",Todoschema);

module.exports={Todomodel};