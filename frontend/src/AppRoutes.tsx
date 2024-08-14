import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectRoute from "./auth/ProtectRoute";

const AppRoutes = ()=> {
    return(
        <Routes>
        <Route path="/" element={<Layout showSidebar> </Layout>}/>
        <Route path="/auth-callback" element={ <AuthCallbackPage/> }/>

        <Route element={<ProtectRoute/>}>
            <Route path="/user-profile" element={<UserProfilePage/>}/>
        </Route>
        
        <Route path="/alert" element={<span>ALERT</span>}/>
        <Route path="/inventory-driver" element={<span>DRIVER DETAILS</span>}/>
        <Route path="/inventory-vehicle" element={<span>VEHICLE ENTRY</span>}/>
        <Route path="/inventory-tyre" element={<span>TYRE ENTRY</span>}/>
        <Route path="/inventory-battery" element={<span>BATTERY ENTRY</span>}/>
        <Route path="/entry-vehicle" element={<span>DAILY ENTRY</span>}/>
        <Route path="/mnt-tyre" element={<span>TYRE MAINTENANCE</span>}/>
        <Route path="/mnt-battery" element={<span>BATTERY MAINTENANCE</span>}/>
        <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;