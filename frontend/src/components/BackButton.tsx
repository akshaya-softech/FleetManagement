import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <Button onClick={handleBackClick}>
      <ArrowLeft />
      Back
    </Button>
  );
};

export default BackButton;