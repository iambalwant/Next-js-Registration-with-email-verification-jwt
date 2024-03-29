import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!); 
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log('mongoos db connected')
        })
        connection.on('error',(err)=>{
            console.log('mongoos db not connected: '+ err);
            process.exit();
        })
    } catch (error) {
        console.log("mongoose db message",error);
    }
};