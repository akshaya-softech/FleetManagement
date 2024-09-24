import express from "express";
import multer from "multer";
import MyDriverController from "../controllers/MyDriverController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyDriverRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5Mb
    },
});

// /api/my/driver
// router.post("/", upload.single("imageFile"), MyDriverController.createMyDriver);

router.post("/", validateMyDriverRequest, jwtCheck, jwtParse, MyDriverController.createMyDriver);

export default router;