import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { TriangleAlert } from "lucide-react";
import UserNameMenu from "./UserNameMenu";
 
const MainNavigation = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        <span className="flex space-x-2 items-center">
        {isAuthenticated ? (
            <>
              <TriangleAlert className='mr-2 h-4 w-4' />
              <Link to="/alert" 
              className="hover:text-red-500 hover:bg-white">
                Alert Status
              </Link>
              <UserNameMenu />
            </>
          ) : (
            <Button 
            variant="ghost" 
            className="font-bold hover:text-violet-500 hover:bg-white"
            onClick={async () => await loginWithRedirect()}
            >
                Log In
            </Button>
        )}
        </span>
    );  
};

export default MainNavigation;