import VehicleProfileForm, { VehicleFormData } from "@/forms/inventory-form/VehicleProfileForm";

const VehicleProfilePage = () => {
    
  
    return (
      <VehicleProfileForm currentVehicle={{
        vehicleNumber: "",
        vehicleModel: "",
        rcNumber: "",
        isActive: true,
        updateDates: {
          fc: {
            lastUpdate: new Date(),
            nextUpdate: new Date(),
          },
          permit: {
            lastUpdate: new Date(),
            nextUpdate: new Date(),
          },
          greentax: {
            lastUpdate: new Date(),
            nextUpdate: new Date(),
          },
          mvtax: {
            lastUpdate: new Date(),
            nextUpdate: new Date(),
          },
          motorinsurance: {
            lastUpdate: new Date(),
            nextUpdate: new Date(),
          },
          cllinsurance: {
            lastUpdate: new Date(),
            nextUpdate: new Date(),
          },
          pollution: {
            lastUpdate: new Date(),
            nextUpdate: new Date(),
          },
        },
      }} onSave={function (_vehicleProfileData: VehicleFormData): void {
        throw new Error("Function not implemented.");
      }} isLoading={false} />
    );
  };

export default VehicleProfilePage;