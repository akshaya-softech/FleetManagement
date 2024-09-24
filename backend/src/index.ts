// initialise Express, handle API routes, connection to mongo and frontend

import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import myDriverRoute from "./routes/MyDriverRoute";
import myVehicleRoute from "./routes/MyVehicleRoute";
import { v2 as cloudinary } from 'cloudinary';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=> console.log("Connected to database"));

// Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const app = express();
app.use(express.json())
app.use(cors())

// health endpoint
app.get("/health", async (req: Request, res: Response) => {
    res.send({message: "health ok"});
});

// define endpoint
app.use("/api/my/user", myUserRoute);

// define endpoint for driver inventory
app.use("/api/my/driver", myDriverRoute);

// define endpoint for vehicle inventory
app.use("/api/my/vehicle", myVehicleRoute);

app.listen(7000, ()=> {
    console.log("Server started on 7000 port");
});