import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

type Props = {
    children: React.ReactNode;
    showSidebar?: boolean;
  
}

const Layout = ({ children, showSidebar = false }: Props) => {
    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className='hidden md:block h-[100vh] w-[300px]'>
            {showSidebar && <Sidebar />}
            </div>
            <div className='p-5 w-full md:max-w-[1140px]'>{children}</div>
            <Footer />            
        </div>
    );
  
};

export default Layout;