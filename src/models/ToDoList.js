const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
   UserName: {type:String},
   subject: {type: String},
   description: {type: String},
   status: {type:String},
   CreateDate: {type: Date},
   UpdateDate: {type: Date}
},
  { versionKey: false }
);

const ToDoList = mongoose.model("ToDoList", DataSchema);

module.exports = ToDoList;