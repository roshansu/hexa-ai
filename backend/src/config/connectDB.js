import mongoose from "mongoose";



async function DbConnect() {
    await mongoose.connect(process.env.DB)
}

export default DbConnect