import DriverProfileForm, { DriverFormData } from "@/forms/inventory-form/DriverProfileForm";

const DriverProfilePage = () => {
    
  
    return (
      <DriverProfileForm currentDriver={{
            name: "",
            empNumber: "",
            fatherName: "",
            address: "",
            mobileNumber: 0,
            aadharNumber: 0,
            licenseNumber: "",
            licenseExpiry: new Date(),
            isActive: true,
        }} onSave={function (_driverProfileData: DriverFormData): void {
            throw new Error("Function not implemented.");
        } } isLoading={false} />
    );
  };

export default DriverProfilePage;