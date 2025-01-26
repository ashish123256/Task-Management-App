import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    status: {
        type: String,
        enum:["Completed","Pending","Done"],
        default: "Pending"
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
     
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
});


const Task = mongoose.model("Task", taskSchema);

export default Task;