import {Navigate} from 'react-router-dom';
import React from 'react';
import Cookies from "js-cookie";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const token = Cookies.get('GPAuth');
    // 如果没有 token，跳转到登录页面
    if (!token || token === 'false') {
        return <Navigate to="/login"/>;
    } else if (token || token === 'true') {
        // 如果有 token，显示受保护的页面
        return <>{children}</>;
    }
};

export default PrivateRoute;
