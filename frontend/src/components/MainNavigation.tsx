import { Button } from "./ui/button";
import { Link } from "react-router-dom";
 
const MainNavigation = () => {
    return(
        <Link to="/login" className="flex items-center">
            <Button variant="ghost" className="font-bold hover:text-violet-500 hover:bg-white">
                Log In
            </Button>
        </Link>
    );  
};

export default MainNavigation;