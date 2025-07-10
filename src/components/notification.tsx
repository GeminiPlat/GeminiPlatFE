import React, {createContext, useContext, ReactNode} from 'react';
import {notification} from 'antd';
import {StopFilled} from "@ant-design/icons";

interface NotificationProps {
    message: string;
    description: string;
    icon: ReactNode;
}

interface NotificationProviderProps {
    children: ReactNode;
}

// 创建一个上下文，openNotification 函数类型为接受 NotificationProps 对象的函数
const NotificationContext = createContext<((props: NotificationProps) => void) | undefined>(undefined);

export const NotificationProvider: React.FC<NotificationProviderProps> = ({children}) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = ({message, description, icon}: NotificationProps) => {
        api.open({
            message: message || '通知标题',
            description: description || '描述',
            icon: icon || <StopFilled style={{color: '#ff0000'}}/>, //<CheckCircleFilled style={{color: '#00ff00'}}/>
            placement: "bottomRight",
            showProgress: true,
            pauseOnHover: true,
        });
    };

    return (
        <NotificationContext.Provider value={openNotification}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};

// 自定义 Hook 方便使用
// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = (): ((props: NotificationProps) => void) => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
