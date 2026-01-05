import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import "dotenv/config";

let server: Server;
const port = 5000;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPass}@cluster0.yzsgyep.mongodb.net/jotio?appName=Cluster0`
    );
    console.log("Connected to mongoDB using moongose");
    server = app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.log(error)
  }
}

main();
