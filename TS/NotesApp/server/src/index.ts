import express from "express";
import { PORT } from "./configs/server.config.js";
import chalk from "chalk";

import connectToDb from "./configs/database.config.js";
import userRouter from './routes/user.route.js'

import cookieParser from "cookie-parser";
import notesRouter from "./routes/note.route.js";




const app = express();

// middleware
app.use(express.json());  
app.use(cookieParser());

// mount routers
app.use("/user", userRouter);  
app.use("/notes", notesRouter);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Now Start Building controllers" });
});



// database connection
connectToDb()
  .then(() => {
    console.log(
      chalk.bgMagenta("Connected to MongoDB Database successfully ✅")
    );
    app.listen(PORT, () => {
      console.log(
        chalk.bgGreenBright(`🚀 Server is listening at http://localhost:${PORT}`)
      );
    });
  })
  .catch((error) => {
    console.error(
      chalk.bgRed("❌ Error in connecting to MongoDB Database: " + error.message)
    );
    process.exit(1);
  });

