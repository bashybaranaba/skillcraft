import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Ensure this is called at the top

const connect = async () => {
  if (mongoose.connections[0].readyState) {
    // Already connected
    return;
  }

  try {
    console.log("MongoDB URI:", process.env.MONGODB_URI); // Debugging log
    await mongoose.connect(process.env.MONGODB_URI, {
      // useNewUrlParser: true, // Deprecated
      // useUnifiedTopology: true, // Deprecated
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    throw new Error("MongoDB connection failed");
  }
};

export default connect;
