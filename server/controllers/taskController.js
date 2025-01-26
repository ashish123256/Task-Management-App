import Task from "../models/taskModel.js";
import { errorHandler } from "../utils/error.js";


export const createTask = async (req, res,next ) => {
    try {
        
        const {title, description,} = req.body;

        if(!req.user) {
            return next(errorHandler(401,"Unauthorized"));
        }
        const createdBy = req.user._id;
      
        const newTask = await Task.create({title, description, createdBy});
      
          res.status(201).json({
              message:"Task created successfully",
              newTask,
              success:true
          });
      
    } catch (error) {
        next(errorHandler(500,"Internal Server Error"));
    }
 
}

export const getTasks = async (req, res,next ) => {
  const user = req.user._id;
  try {
    
    const tasks = await Task.find({createdBy:user});
    res.status(200).json({
      success:true,
      tasks
    });

  } catch (error) {
    next(errorHandler(500,"Internal Server Error"));
  }
}

export const getSingleTask = async (req, res,next ) => {
 
    const {id} = req.params;
    try {
        const task = await Task.findById(id);
        if(!task) return next(errorHandler(404,"Task not found"));
        res.status(200).json({
            success:true,
            task
        });
        } catch (error) {
            next(errorHandler(500,"Internal Server Error"));
        }

}

export const updateTask = async (req, res,next ) => {
    const {id} = req.params;
    try {
        let task = await Task.findById(id);
        if(!task) return next(errorHandler(404,"Task not found"));
   
        task = await Task.findByIdAndUpdate(id, req.body, {new:true, runValidators:true, useFindAndModify:false});



        res.status(200).json({
            message:"Task updated successfully",
            success:true,
            task
           
        });
        } catch (error) {
            next(errorHandler(500,"Internal Server Error"));
        }
}

export const deleteTask = async (req, res,next ) => {
  const {id} = req.params;
    try {
        const task = await Task.findById(id);
        if(!task) return next(errorHandler(404,"Task not found"));
   
        await task.deleteOne();
        res.status(200).json({
            message:"Task deleted successfully",
            success:true
        });
        } catch (error) {
            next(errorHandler(500,"Internal Server Error"));
        }
}