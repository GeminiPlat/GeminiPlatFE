import React from 'react';
import {Layout, Menu, theme} from 'antd';
import type {MenuProps} from 'antd';
import serverSvg from './assets/img/server.svg';
import userSvg from './assets/img/user.svg';
import settingsSvg from './assets/img/settings.svg';
import logoutSvg from "./assets/img/logout.svg";
import {Outlet} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import './assets/css/layout.css'
import {postData} from "./assets/ts/req.ts";
import Cookies from "js-cookie";
import {useNotification} from "../components/notification.tsx";
import {CheckCircleFilled} from "@ant-design/icons";
import {generalText, layoutPage} from "./assets/ts/locale.ts";
// import {adminPerms} from "./assets/ts/perms.ts";

const {Header, Content, Footer} = Layout;

const LayoutPage: React.FC = () => {
    const openNotification = useNotification();
    const navigate = useNavigate();
    const locale = localStorage.getItem('locale') ?? 'EN';
    const dark = localStorage.getItem('dark') ?? 'false';
    const decoder = new TextDecoder();
    const userInfoString = decoder.decode(Uint8Array.from(atob(localStorage.getItem('GPUserInfo') as string), char => char.charCodeAt(0)));
    const userInfoObj = JSON.parse(userInfoString);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const items: MenuProps['items'] = [{
        key: '1',
        icon: <img src={serverSvg} alt="serverIcon" className="iconStyle"/>,
        label: layoutPage.instance[locale],
        style: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        onClick: () => {
            localStorage.setItem('layoutMenuKey', '1');
            navigate('/')
        }
    }, {
        key: '2',
        icon: userInfoObj.avatar == 'null' ?
            <img src={userSvg} alt="userIcon" className="iconStyle"
                 style={{borderRadius: '50%'}}/> :
            <img src={userInfoObj.avatar} alt="userIcon" className="iconStyle"
                 style={{borderRadius: '50%'}}/>,
        label: layoutPage.user[locale],
        style: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        onClick: () => {
            localStorage.setItem('layoutMenuKey', '2');
            navigate('/user')
        }
    },
        // 通过条件渲染，只有在 permsStatus 为 true 时才显示 key: 3 项
        // ...(adminPerms(locale)[0].permsStatus ? [{
        ...(userInfoObj.isAdmin === 1 ? [{
            key: '3',
            icon: <img src={settingsSvg} alt="settingsIcon" className="iconStyle"/>,
            label: layoutPage.settings[locale],
            style: {
                display: 'flex',
                // flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            },
            onClick: () => {
                localStorage.setItem('layoutMenuKey', '3');
                navigate('/settings')
            }
        }] : [])
        , {
            key: '4',
            icon: <img src={logoutSvg} alt="logoutIcon" className="iconStyle"/>,
            label: layoutPage.logout[locale],
            style: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            },
            onClick: async () => {
                try {
                    Cookies.set('GPAuth', 'false', {expires: 1});
                    localStorage.removeItem('GPUserInfo');
                    localStorage.setItem('layoutMenuKey', '1');
                    navigate('/login')
                    // 弹出通知
                    openNotification({
                        message: generalText.tip[locale],
                        description: layoutPage.logoutDescription[locale],
                        icon: <CheckCircleFilled style={{color: '#00ff00'}}/>
                    })
                    return await postData('/logout', {
                        castor_email: userInfoObj.email
                    })
                } catch (err) {
                    console.log(err)
                }
            }
        }]


    return (

        <Layout
            style={{
                height: '100%',
                width: '100vw',
                backgroundColor: dark === 'false' ? '#f0f2f5' : '#1a1a1a',
            }}>
            <Header className="Header" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                zIndex: 1,
            }}>
                <div style={{
                    width: "90vw",
                    display: "flex",
                    flexDirection: "column",
                    padding: '0px 48px',
                    // border: "1px red solid",
                }}>
                    <div style={{display: "flex"}}>
                        <div className="Header_Title" onClick={() => {
                            navigate('/')
                        }}>GeminiPlatform
                        </div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={[localStorage.getItem('layoutMenuKey') ?? '1']}
                            style={{
                                flex: 1,
                                minWidth: 0,
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: "#1a1a1a"
                            }}
                            items={items}
                        />
                    </div>
                </div>
            </Header>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Content
                    style={{padding: '48px 48px', paddingTop: '80px', flex: '1', width: "90vw", height: "100%"}}>
                    <div
                        style={{
                            background: colorBgContainer,
                            minHeight: 280,
                            padding: '10px 24px 10px 24px',
                            borderRadius: '10px',
                            backgroundColor: dark === 'false' ? '#ffffff' : '#262626',
                        }}
                    >
                        {/*Content*/}
                        <Outlet/>
                    </div>
                </Content>
            </div>

            <Footer style={{
                textAlign: 'center',
                backgroundColor: dark === 'false' ? '#f0f2f5' : '#1a1a1a',
                height: '10px',
            }}>
                GeminiPlatform ©{new Date().getFullYear()} Created by StephXu with ❤️
            </Footer>
        </Layout>
    );
};

export default LayoutPage;