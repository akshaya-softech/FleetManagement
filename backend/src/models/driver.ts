import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  empNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
  },
  address: {
    type: String,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  aadharNumber: {
    type: Number,
    required: true,
  },
  licenseNumber: {
    type: Number,
    required: true,
  },
  licenseExpiry: {
    type: Date,
    required: true,
  },
  lastUpdated: { 
    type: Date, 
    required: true 
  },
  isActive: {
    type: Boolean, // Note the capitalization
    required: true,
    default: true // Set a default value if needed
  }

});

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;