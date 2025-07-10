import {Routes, Route} from "react-router-dom";
import LoginPage from "../pages/login.tsx";
import LayoutPage from "../pages/layout.tsx";
import InstsList from "../pages/instsList.tsx";
import UserPage from "../pages/user.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import Settings from "../pages/settings.tsx";
import InstDetail from "../pages/instDetail.tsx";

const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            {/* 受保护的路由 */}
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <LayoutPage/>
                    </PrivateRoute>
                }
            >
                <Route index element={<InstsList listAll="false"/>}/>
                <Route path="user" element={<UserPage/>}/>
                <Route path="settings" element={<Settings/>}/>
                <Route path="instance" element={<InstDetail/>}/>
            </Route>
        </Routes>

    );
};

export default RouterConfig;