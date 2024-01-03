import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const connection = mongoose.connect(
      "mongodb+srv://clox:MARTIN123martin@taskapp.lwesx1l.mongodb.net/taskApp?retryWrites=true&w=majority"
    );
    if (connection) {
      console.log("Connected to database");
    }
  } catch (error) {
    console.log("Error in connectToDatabase", error);
  }
};

export default connectToDatabase;