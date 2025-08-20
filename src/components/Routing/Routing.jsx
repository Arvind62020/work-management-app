import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../../Pages/Layout/Layout";
import UserLayout from "../../Pages/Layout/UserLayout";
import AdminLayout from "../../Pages/Layout/AdminLayout";
import PageLoader from "../PageLoader/PageLoader";
import CustomErrorBoundary from "../../components/CustomErrorBoundary/CustomErrorBoundary";




const Home = lazy(() => import('../../Pages/Home/Home'));
const LoginPage = lazy(() => import('../../Pages/Login/Login'));
const AdminLoginPage = lazy(() => import('../../Pages/Login/AdminLogin'));
const WorkUpdatePage = lazy(() => import('../../Pages/WorkUpdatePage/WorkUpdatePage'));
const WorkPage = lazy(() => import('../../Pages/WorkPage/WorkPage'));
const AddWork = lazy(() => import('../../Pages/WorkPage/AddWork'));
const WorkList = lazy(() => import('../../Pages/WorkPage/WorkList'));
const EditJob = lazy(() => import('../../Pages/WorkPage/EditJob'));
const UserWorkPage = lazy(() => import('../../Pages/UserWorkPage/UserWorkPage'));
const EditUserJob = lazy(() => import('../../Pages/UserWorkPage/EditUserJob'));
const EditUserComment = lazy(() => import('../../Pages/UserWorkPage/EditUserComment'));

function Routing() {
    return (
        <CustomErrorBoundary>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={
                        <Suspense fallback={<PageLoader />}>
                            <Home />
                        </Suspense>
                    } />
                    <Route path="login" element={
                        <Suspense fallback={<PageLoader />}>
                            <LoginPage />
                        </Suspense>
                    } />
                    <Route path="adminlogin" element={
                        <Suspense fallback={<PageLoader />}>
                            <AdminLoginPage />
                        </Suspense>
                    } />
                </Route>

                <Route path="/user" element={<UserLayout />}>
                    <Route index element={
                        <Suspense fallback={<PageLoader />}>
                            <Home />
                        </Suspense>
                    } />
                    <Route path="work" element={
                        <Suspense fallback={<PageLoader />}>
                            <UserWorkPage />
                        </Suspense>
                    } />
                    <Route path="list/edit/:jobId" element={
                        <Suspense fallback={<PageLoader />}>
                            <EditUserJob />
                        </Suspense>
                    } />
                    <Route path="list/editcomment/:jobId" element={
                        <Suspense fallback={<PageLoader />}>
                            <EditUserComment />
                        </Suspense>
                    } />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={
                        <Suspense fallback={<PageLoader />}>
                            <Home />
                        </Suspense>
                    } />
                    <Route path="addwork" element={
                        <Suspense fallback={<PageLoader />}>
                            <AddWork />
                        </Suspense>
                    } />
                    <Route path="update" element={
                        <Suspense fallback={<PageLoader />}>
                            <WorkUpdatePage />
                        </Suspense>
                    } />
                    <Route path="list" element={
                        <Suspense fallback={<PageLoader />}>
                            <WorkList />
                        </Suspense>
                    } />
                    <Route  path="list/edit/:jobId"  element={
                        <Suspense fallback={<PageLoader />}>
                            <EditJob />
                        </Suspense>
                    } />
                </Route>
                
            </Routes>
        </CustomErrorBoundary>
    )
}

export default Routing;

