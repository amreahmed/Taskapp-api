import { Request, Response, response } from "express";
import { authRequest } from "../middleware";
import Task from "../models/task-model";
import { ITask } from "../types";

export const getAllTasks = async (req: authRequest, res: Response) => {
  try {
    const userId = req.user;
    const tasks = await Task.find({
      user: userId,
    });
    res.send(tasks);
  } catch (error) {
    console.log("Error in getAllTasks", error);
    res.send({ error: "Error with fetching tasks" });
    throw error;
  }
};

export const getAllTasksByCategory = async (
  req: authRequest,
  res: Response
) => {
  try {
    const userId = req.user;
    const { id } = req.params; // destructuring categoryId from req.params
    const tasks = await Task.find({
      user: userId,
      categoryId: id,
    });
    res.send(tasks);
  } catch (error) {
    console.log("Error in getAllTasksByCategory", error);
    res.send({ error: "Error with fetching tasks by category" });
    throw error;
  }
};

export const createTask = async (req: authRequest, res: Response) => {
  try {
    const userID = req.user;
    const { name, date, categoryId }: ITask = req.body;
    const task = await Task.create({
      user: userID,
      name,
      date,
      categoryId,
    });

    res.send(task);
  } catch (error) {
    console.log("Error in createTask", error);
    res.send({ error: "Error while creating task" });
    throw error;
  }
};

export const toggleTaskStatus = async (req: authRequest, res: Response) => {
  try {
    const { isCompleted } = req.body;
    const { id } = req.params;

    const task = await Task.updateOne(
      {
        _id: id,
      },
      {
        isCompleted,
      }
    );
    res.send({message:"Task updated successfully"});
  } catch (error) {
    console.log("Error in createTask", error);
    res.send({ error: "Error while toggle task" });
    throw error;
  }
};


export const deleteTask = async (
  request: authRequest,
  response: Response
) => {
  try {
    const id = request.params.id;
    await Task.deleteMany({ _id: id });
    response.send({ message: "task deleted successfully" });
  } catch (error) {
    console.log("Error in deleteTask", error);
    response.send({ error: "something went wrong" });
    throw error;
  }
};



export const getAllCompletedTasks = async (request: authRequest, response: Response) => {
  try {
    const userId = request.user;
    const tasks = await Task.find({
      user: userId,
      isCompleted: true,
    });
    response.send(tasks)
    
  } catch (error) {
    console.log("Error in getAllCompletedTasks", error);
    response.send({ error: "something went wrong when try to get all completed tasks" });
    throw error;
  }
};


export const getTasksForToday = async (
  request: authRequest,
  response: Response
) => {
  try {
    const userId = request.user;
    const todaysISODate = new Date()
    todaysISODate.setHours(0,0,0,0)
    console.log(todaysISODate)
    const tasks = await Task.find({
      user: userId,
      date: todaysISODate.toISOString()
        
    });
   response.send(tasks)
  } catch (error) {
    console.log("Error in getTasksForToday", error);
    response.send({
      error: "something went wrong when try to get all tasks for today",
    });
    throw error;
  }
};



export const editTask = async (request: authRequest, response: Response) => {
  try {
    const { _id, categoryId, date, name }: ITask = request.body
    await Task.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          categoryId,
          date,
        },
      }
    )
    response.send({ message: "Task updated successfully" })
  } catch (error) {
    console.log("error in editTask", error)
    response.send({ error: " Error while updating the task" })
    throw error
  }
}

