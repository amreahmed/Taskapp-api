import express, {Request, Response} from "express";
import { request } from "http";
import connectToDatabase from "./db";
import userRoutes from "./routes/user.routes";
import categoryRoutes  from "./routes/category.routes";
import taskRouter from "./routes/task.routes";
import cors from "cors"


const application = express();


const corsOptions = {
  origin: "*",
  methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
application.use(cors(corsOptions));
application.use(express.json());
.listen(process.env.PORT || 1337)
connectToDatabase();
application.get("/ping", (request: Request, response: Response) => {
    response.send("pong");
});

application.use("/user", userRoutes);
application.use("/category", categoryRoutes);
application.use("/tasks", taskRouter);


application.listen(port,()=> {
    console.log(`The server is running on port ${port}`);
});
