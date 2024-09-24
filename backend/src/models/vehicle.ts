import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  rcNumber: { type: String, required: true },
  isActive: {
    type: Boolean, // Note the capitalization
    required: true,
    default: true // Set a default value if needed
  },
  updateDates: {
    type: Object,
    required: true,
    properties: {
      fc: {
        lastUpdate: { type: Date, required: true },
        nextUpdate: { type: Date, required: true },
      },
      permit: {
        lastUpdate: { type: Date, required: true },
        nextUpdate: { type: Date, required: true },
      },
      greentax: {
        lastUpdate: { type: Date, required: true },
        nextUpdate: { type: Date, required: true },
      },
      mvtax: {
        lastUpdate: { type: Date, required: true },
        nextUpdate: { type: Date, required: true },
      },
      motorinsurance: {
        lastUpdate: { type: Date, required: true },
        nextUpdate: { type: Date, required: true },
      },
      cllinsurance: {
        lastUpdate: { type: Date, required: true },
        nextUpdate: { type: Date, required: true },
      },
      pollution: {
        lastUpdate: { type: Date, required: true },
        nextUpdate: { type: Date, required: true },
      },
    },
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;