// // model talk to our databases 
// import mongoose, { mongo } from "mongoose";

// const userSchema = new mongoose.Schema({
//   username:{
//     type: String,
//     required: [true, "Please provide an Username"],
//     unique: true,
//   },
//   email:{
//     type: String,
//     required: [true, "Please provide an email"],
//     unique: true,
//   },
//   password:{
//     type: String,
//     required: [true, "Please provide an password"],
//   },
//   isVerfied:{
//     type:Boolean,
//     default: false,
//   },
//   isAdmin:{
//     type: Boolean,
//     default: false,
//   },
//   forgotPasswordToken:String,
//   forgotPasswordTokenExpiry: Date,
//   verifyToken: Date,
//   verifyTokenExpiry: Date,
// })

// const User = mongoose.model.users || mongoose.model("users",userSchema);
// console.log(User)
// export default User



import mongoose, { Document, Model } from "mongoose";

interface UserDocument extends Document {
  username: String;
  email: String;
  password: String;
  isVerified: Boolean;
  isAdmin: Boolean;
  forgotPasswordToken?: String;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: String;
  verifyTokenExpiry?: Date;
}

const userSchema = new mongoose.Schema<UserDocument>({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Define User model type
interface UserModel extends Model<UserDocument> {}

// Try to retrieve existing model or define new one
let User: UserModel;
try {
  User = mongoose.model<UserDocument, UserModel>("users");
} catch (error) {
  User = mongoose.model<UserDocument, UserModel>("users", userSchema);
}

export default User;
