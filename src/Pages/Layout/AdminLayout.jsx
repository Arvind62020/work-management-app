import { Outlet } from 'react-router-dom';
import AdminNavbar from "../../components/Navbar/AdminNavbar";

function AdminLayout() {
    return (
        <>
            <AdminNavbar /> {/* This navbar is the shared ui we want to across pages */}
            <Outlet /> {/* The actual page which which will be rendered along with navbar */}
        </>
    )
}

export default AdminLayout;