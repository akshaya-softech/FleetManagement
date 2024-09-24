import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("designation")
      .isString()
      .notEmpty()
      .withMessage("Designation must be a string"),
    handleValidationErrors,
  ];

export const validateMyDriverRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("empNumber").isString().notEmpty().withMessage("Employee number must be a string"),
    body("mobileNumber")
      .isString()
      .notEmpty()
      .isLength({ min: 10, max: 10 })
      .withMessage("Mobile number must be 10 digits"),
    body("aadharNumber")
      .isString()
      .notEmpty()
      .isLength({ min: 12, max: 12 })
      .withMessage("Aadhar number must be 12 digits"),
    body("licenseNumber")
      .isString()
      .notEmpty()
      .isLength({ min: 16, max: 16 })
      .matches(/^\d{4}-\d{4}-\d{4}-\d{4}$/)
      .withMessage("License number must be 16 digits in the format 'XXXX-XXXX-XXXX-XXXX'"),
    body("licenseExpiry")
      .isDate()
      .notEmpty()
      .custom((value: string) => {
        const date = new Date(value);
        if (isNaN(date.getTime()) || date <= new Date()) {
          return 'License expiry date must be in the future';
        }
        return true;
      })  
      .withMessage("License expiry date must be in the future"),
    handleValidationErrors,
  ];
  