import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateVehicleRequest = {
    auth0Id: string;
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

export const useCreateMyVehicle = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyVehicleRequest = async (vehicle: CreateVehicleRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/vehicle`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicle),
    });

    if (!response.ok) {
      throw new Error("Failed to create Vehicle");
    }
  };

  const {
    mutateAsync: createVehicle,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyVehicleRequest);

  return {
    createVehicle,
    isLoading,
    isError,
    isSuccess,
  };
};

