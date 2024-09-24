import mongoose from "mongoose";
import { vehicleSchema } from "vehicle";

const tyreSchema = new mongoose.Schema({
  tyreNumber: {
    type: Number,
    required: true,
  },
  vehicleNumber: {
    [vehicleSchema],
    required: true,
  },
  tyreKm: {
    type: Number,
    required: true,
  },

});

const Tyre = mongoose.model("Tyre", tyreSchema);
export default Tyre;