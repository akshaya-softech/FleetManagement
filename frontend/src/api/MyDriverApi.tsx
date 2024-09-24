import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateDriverRequest = {
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

export const useCreateMyDriver = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyDriverRequest = async (driver: CreateDriverRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/driver`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(driver),
    });

    if (!response.ok) {
      throw new Error("Failed to create Driver");
    }
  };

  const {
    mutateAsync: createDriver,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyDriverRequest);

  return {
    createDriver,
    isLoading,
    isError,
    isSuccess,
  };
};

