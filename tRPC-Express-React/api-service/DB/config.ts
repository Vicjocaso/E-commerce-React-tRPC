import mongoose from "mongoose";

const connectToMongoDb = async () => {
  //   const mongoUri = process.env.MONGO_URI;
  try {
    const mongoUri =
      "mongodb+srv://admin:admin123456@evisanet.upafu.mongodb.net/?retryWrites=true&w=majority";

    if (mongoUri) {
      const db = await mongoose.connect(mongoUri);
      console.log("Connected to MongoDB: ", db.connection.db.databaseName);
    }
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

export default connectToMongoDb;
