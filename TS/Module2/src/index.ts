import { DataStorage } from "./storage.js";

interface User {
  id: number;
  name: string;
}

const userStore = new DataStorage<User>();
userStore.save({ id: 1, name: "Anand" });
userStore.save({ id: 2, name: "Rahul" });

console.log('           all users ---->> ',userStore.list());       // all users
console.log('           user with id 1 ---->> ',userStore.findById(1));  // user with id 1
