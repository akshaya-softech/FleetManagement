import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import MainNavigation from "./MainNavigation";

const Header = () => {

    return(<div className="border-b-2 bg-white-700 py-6">
        <div className="container mx-auto flex justify-between">
            <span className="text-2xl text-purple-700 font-bold tracking-tight justify-end">
                <Link to="/">Fleet Management System</Link>
            </span>
            <div className="md:hidden">
                <Navigation />
            </div>
            <div className="hidden md:block">
                <MainNavigation />
            </div>
        </div>
    </div>
    );
};

export default Header;