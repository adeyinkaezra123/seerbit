import mongoose from "mongoose";

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  if (process.env.DB_URI !== undefined) {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URI);
    try {
      // Connect to the MongoDB cluster
      mongoose.connect(process.env.DB_URI);
      console.log("Connected to a database ")
    } catch (e) {
      console.log("could not connect");
    }
  } else {
    console.error("DB_URI is not defined!");
  }
};
export default dbConnect;
