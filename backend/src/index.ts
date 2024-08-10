// initialise Express, handle API routes, connection to mongo and frontend

import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=> console.log("Connected to database"));

const app = express();
app.use(express.json())
app.use(cors())

// define endpoint
app.get("/test", async (req: Request, res: Response)=>{
    res.json({ message: "Hello! Vijay Gas"});

});

app.get("/sign", async (req: Request, res: Response)=>{
    res.json({ message: "Shutup"});

});

app.listen(7000, ()=> {
    console.log("Server started on 7000 port");
});