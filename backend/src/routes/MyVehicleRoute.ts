import express from "express";
import multer from "multer";
import MyVehicleController from "../controllers/MyVehicleController";

const router = express.Router();

router.post("/", MyVehicleController.createMyVehicle);

export default router;