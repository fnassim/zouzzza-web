import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define the MONGODB_URI environment variable in .env.local");
}

// Use global variable to cache connection in development (prevents multiple connections)
let cached = global.mongoose || { conn: null, promise: null };

const connectMongo = async () => {
  if (cached.conn) {
    console.log("🔄 Using existing MongoDB connection.");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🛠️ Creating a new MongoDB connection...");
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  console.log("✅ MongoDB connected successfully.");
  global.mongoose = cached;
  return cached.conn;
};

// ✅ Export default so it can be imported easily
export default connectMongo;
