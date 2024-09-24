import { Request, Response } from "express";
import Driver from "../models/driver";
import cloudinary from "cloudinary";


const createMyDriver = async (req: Request, res: Response) => {
    try {
        const { empNumber } = req.body;
        const existingDriver = await Driver.findOne({ empNumber });
                
        if (existingDriver) {
            return res
              .status(409)
              .json({ message: "Driver already exists" });
          }
        
        //image = req.file as Express.Multer.File;
        //const base64Image = Buffer.from(image.buffer).toString("base64");
        //const dataURI = `data:${image.mimetype};base64,${base64Image}`;
        //const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

        const driver = new Driver(req.body);
        //driver.driverPicture = uploadResponse.url;
        // driver.licensePicture = uploadResponse.url;
        driver.lastUpdated = new Date();
        await driver.save();
    
        res.status(201).send(driver);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating Driver" });
      }

};


export default {
  createMyDriver,
};