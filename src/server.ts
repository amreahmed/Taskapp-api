import express, {Request, Response} from "express";
import { request } from "http";
import connectToDatabase from "./db";
import userRoutes from "./routes/user.routes";
import categoryRoutes  from "./routes/category.routes";
import taskRoutes from "./routes/task.routes";
import cors from "cors"


const application = express();
application.use(cors());
application.use(express.json());
const port = 1337;
connectToDatabase();
application.get("/ping", (request: Request, response: Response) => {
    response.send("pong");
});

application.use("/user", userRoutes);
application.use("/category", categoryRoutes);
application.use("/tasks", taskRoutes);


application.listen(port,()=> {
    console.log(`The server is running on port ${port}`);
});