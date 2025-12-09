import mongoose from "mongoose";

export interface IUser extends Document{
    name:string,
    email:string,
    password:string,
    notes:mongoose.Types.ObjectId[]
}

const userSchema = new mongoose.Schema<IUser>({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    notes:{
        type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
        default:[]
    }
})

const User = mongoose.model<IUser>("User", userSchema);
export default User;
