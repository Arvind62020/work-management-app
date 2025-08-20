import { Outlet } from 'react-router-dom';
import UserNavbar from "../../components/Navbar/UserNavbar";

function UserLayout() {
    return (
        <>
            <UserNavbar /> {/* This navbar is the shared ui we want to across pages */}
            <Outlet /> {/* The actual page which which will be rendered along with navbar */}
        </>
    )
}

export default UserLayout;