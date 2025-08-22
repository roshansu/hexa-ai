import mongoose, {Schema, Mongoose} from "mongoose";

const userSchema = new Schema({
    fullName:{
        type:String,
        minLength: 3,
        maxLength: 40,
        required: true
    },
    emailId:{
        type:String,
        required:true,
        trim: true,
        unique: true,
        immutable: true,
        lowercase: true
    },
      password:{
        type: String,
        required: true
    },
   chatHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "History",
    },
  ],

  project: [
    {
      type: Schema.Types.ObjectId,
      ref: "History",
    },
  ],
}, {timestamps:true})

const User = mongoose.model('user', userSchema);

export default User