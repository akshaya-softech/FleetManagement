export type User = {
    _id: string;
    email: string;
    name: string;
    designation: string;
    profilePicture: string;
  };

export type Driver = {
    name: string;
    empNumber: string;
    fatherName: string;
    address: string;
    mobileNumber: number;
    aadharNumber: number;
    licenseNumber: string;
    licenseExpiry: Date;
    isActive: true;
  };

  export type Vehicle = {
    vehicleNumber: string;
    vehicleModel: string;
    rcNumber: string;
    isActive: boolean;
    updateDates: {
      fc: {
        lastUpdate: Date;
        nextUpdate: Date;
      };
      permit: {
        lastUpdate: Date;
        nextUpdate: Date;
      };
      greentax: {
        lastUpdate: Date;
        nextUpdate: Date;
      };
      mvtax: {
        lastUpdate: Date;
        nextUpdate: Date;
      };
      motorinsurance: {
        lastUpdate: Date;
        nextUpdate: Date;
      };
      cllinsurance: {
        lastUpdate: Date;
        nextUpdate: Date;
      };
      pollution: {
        lastUpdate: Date;
        nextUpdate: Date;
      };
    };
  };