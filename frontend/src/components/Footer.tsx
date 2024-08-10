import { Link } from "react-router-dom";

const Footer = () => {

    return <div className="bg-violet-700 py-1">
        <div className="container mx-auto flex justify-between items-center">
            <span className="text-0.5xl text-white font-bold tracking-tight justify-end">
                <Link to="/">FMS</Link>
            </span>
            <span className="flex items-center text-white px-7 font-bold tracking-tight flex gap-6">
                 <p>Powered by Softech | 2024 | soft_cbe@hotmail.com </p>
                 <p className="cursor-pointer">Privacy Policy</p>
                 <p className="cursor-pointer">Terms of Service</p>
            </span>
        </div>
    </div>;

};

export default Footer;