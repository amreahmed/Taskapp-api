import Express from "express";
import { authenicationMiddleware } from "../middleware";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getAllTasksByCategory,
  toggleTaskStatus,
  getAllCompletedTasks,
  getTasksForToday,
  editTask
} from "../controllers/task.controller";

const taskRouter = Express.Router();
taskRouter.use(authenicationMiddleware);

taskRouter.route("/").get(getAllTasks);
taskRouter.route("/category/:id").get(getAllTasksByCategory);
taskRouter.route("/create").post(createTask);
taskRouter.route("/update/:id").put(toggleTaskStatus);
taskRouter.route("/delete/:id").delete(deleteTask);
taskRouter.route("/completed").get(getAllCompletedTasks);
taskRouter.route("/today").get(getTasksForToday);
taskRouter.route("/edit/:id").put(editTask)


export default taskRouter;
