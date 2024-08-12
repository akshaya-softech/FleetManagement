import { useAuth0 } from "@auth0/auth0-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { CircleUserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const UserNameMenu = () => {
    const { user, logout} = useAuth0();

    return(
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-centre px-3 font-bold hover:text-violet-400 gap-2">
                <CircleUserIcon className="text-violet-400" />
                {user?.email}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-50 shadow-md">
            <DropdownMenuItem className="py-2 px-6 hover:bg-gray-200">
                <Link to="/user-profile" className="hover:text-violet-400">
                User Profile
                </Link>
            </DropdownMenuItem>
            <Separator className="my-2 border-gray-200" />
            <DropdownMenuItem className="py-2 px-6 hover:bg-gray-200">
                <Button onClick={() => logout()} className="flex flex-1 font-bold bg-violet-400 text-white rounded-md">
                Log Out
                </Button>
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
  
}

export default UserNameMenu;