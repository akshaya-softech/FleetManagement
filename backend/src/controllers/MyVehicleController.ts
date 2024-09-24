import { Request, Response } from "express";
import Vehicle from "../models/vehicle";
import cloudinary from "cloudinary";


const createMyVehicle = async (req: Request, res: Response) => {
    try {
        const { empNumber } = req.body;
        const existingVehicle = await Vehicle.findOne({ empNumber });
                
        if (existingVehicle) {
            return res
              .status(409)
              .json({ message: "Vehicle already exists" });
          }

        const vehicle = new Vehicle(req.body);
        await vehicle.save();
    
        res.status(201).send(vehicle);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating Vehicle" });
      }

};


export default {
  createMyVehicle,
};