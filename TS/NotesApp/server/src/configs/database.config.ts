import chalk from "chalk";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// DATABASE_URL can be string | undefined
const DATABASE_URL = process.env.DATABASE_URL

const connectToDb = async (): Promise<void> => {
  try {
    if (!DATABASE_URL) {
      console.log(chalk.bgRed("DATABASE_URL is missing in .env file"));
      process.exit(1);
    }

    await mongoose.connect(DATABASE_URL, {
      serverSelectionTimeoutMS: 60000,
    });

    console.log(chalk.bgGreen("MongoDB connected successfully"));
  } catch (error) {
    const err = error as Error;
    console.log(
      chalk.bgRed(
        "Error in connectToDb in database.config.ts ---->> ",
        err.message
      )
    );
    process.exit(1);
  }
};

export default connectToDb;
