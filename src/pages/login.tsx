import {Input, Button, ConfigProvider} from "antd";
import {CheckCircleFilled, CloseCircleFilled, LockOutlined, UserOutlined} from '@ant-design/icons';
import React, {useState} from "react";
import {createStyles} from 'antd-style';
import './assets/css/login.css'
import {loginPage} from "./assets/ts/locale.ts";
import mc_logo from "./assets/img/mc_logo.svg";
import {postData} from "./assets/ts/req.ts";
import {useNotification} from "../components/notification.tsx";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import {UserInfo} from "./assets/ts/type.ts";

const useStyle = createStyles(({prefixCls, css}) => ({
    linearGradientButton: css`
        &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
            border-width: 0;
            width: 100%;
            height: 25%;

            > span {
                position: relative;
            }

            &::before {
                content: '';
                background: linear-gradient(135deg, #6253e1, #04befe);
                position: absolute;
                inset: 0;
                opacity: 1;
                transition: all 0.3s;
                border-radius: inherit;
            }

            &:hover::before {
                opacity: 0;
            }
        }
    `,
}));

function LoginPage() {
    const openNotification = useNotification();
    const {styles} = useStyle();
    const navigate = useNavigate();
    const encoder = new TextEncoder();
    const locale = localStorage.getItem('locale') ?? 'EN';

    const [castor_email, setEmail] = useState('');
    const [castor_password, setPassword] = useState('');

    // 更新 state 中的用户名
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.target.value);
    };

    // 更新 state 中的密码
    const onPwdChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        if (castor_email === '' || castor_password === '') {
            // 弹出通知
            openNotification({
                message: loginPage.loginFailedNotify[locale],
                description: loginPage.loginWithEmptyEmailOrPassword[locale],
                icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
            })
            return
        } else {
            //     请求api
            const reqRes = await postData('/login', {
                castor_email: castor_email,
                castor_password: castor_password
            })
            if (reqRes.statusCode == 200) {
                Cookies.set('GPAuth', (reqRes.body as { bool: string }).bool, {expires: 1});
                const userInfo = JSON.stringify(reqRes.body as { body: UserInfo });
                const byteArr = encoder.encode(userInfo);
                const base64UserInfo = btoa(String.fromCharCode(...byteArr));
                localStorage.setItem('GPUserInfo', base64UserInfo);
                localStorage.setItem('layoutMenuKey', '1');
                navigate('/');

                // const permsRes = await postData('/getUserPerm', {
                //     castor_email: castor_email
                // })
                // if (permsRes.statusCode == 200) {
                //     const userPerms = JSON.stringify({
                //         'perms': permsRes.body
                //     })
                //     const byteArr = encoder.encode(userPerms);
                //     const base64UserPerms = btoa(String.fromCharCode(...byteArr));
                //     localStorage.setItem('GPUserPerms', base64UserPerms);
                //     navigate('/');
                // }
                // 弹出通知
                openNotification({
                    message: loginPage.loginSuccessNotify[locale],
                    description: loginPage.loginSuccessDescription[locale],
                    icon: <CheckCircleFilled style={{color: '#00ff00'}}/>
                })
            } else if (reqRes.statusCode == 401) {
                // 弹出通知
                openNotification({
                    message: loginPage.loginFailedNotify[locale],
                    description: loginPage.loginWithInvalidEmailOrPassword[locale],
                    icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
                })

            } else {
                // 弹出通知
                openNotification({
                    message: loginPage.loginFailedNotify[locale],
                    description: loginPage.loginWithServerError[locale],
                    icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
                })
            }
        }
    };

    return (
        <>
            <div className="loginRoot" style={{marginLeft: -0}}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{
                        color: "white",
                        marginBottom: "10px",
                        fontSize: "larger",
                        fontWeight: "bolder"
                    }}>{loginPage.loginTitle[locale]}
                    </div>
                    <div className="loginPage">
                        <img src={mc_logo} className="logo react" alt="React logo"/>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "30px"
                        }}>
                            <Input
                                className="input"
                                size="large"
                                placeholder={loginPage.loginEmailPlaceholder[locale]}
                                prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                                allowClear
                                onChange={onEmailChange}
                                onPressEnter={handleSubmit}
                            />
                            <Input.Password
                                className="input"
                                size="large"
                                placeholder={loginPage.loginPasswordPlaceholder[locale]}
                                prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                                allowClear
                                onChange={onPwdChange}
                                onPressEnter={handleSubmit}
                            />
                            <ConfigProvider
                                button={{
                                    className: styles.linearGradientButton,
                                }}
                            >
                                <Button type="primary" size="large" onClick={handleSubmit}>
                                    {loginPage.loginButton[locale]}
                                </Button>
                            </ConfigProvider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
