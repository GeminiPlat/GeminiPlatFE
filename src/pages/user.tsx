import React, {useEffect, useState} from "react";
import {Button, Drawer, Input, List, Switch} from "antd";
import './assets/css/user.css';
import userSvg from "./assets/img/user.svg";
import {CheckCircleFilled, CheckOutlined, CloseCircleFilled, CloseOutlined} from "@ant-design/icons";
import {generalText, permissionsList, userPage} from "./assets/ts/locale.ts";
import {adminPerms, bakPerms, dbPerms, filePerms, instPerms, netPerms, taskPerms} from "./assets/ts/perms.ts";
import {postData} from "./assets/ts/req.ts";
import {useNotification} from "../components/notification.tsx";

const UserPage = () => {
    const openNotification = useNotification();
    const [openPermsDialog, setOpenPermsDialog] = useState(false);
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const userInfoString = decoder.decode(Uint8Array.from(atob(localStorage.getItem('GPUserInfo') as string), char => char.charCodeAt(0)));
    const userInfoObj = JSON.parse(userInfoString);
    const locale = localStorage.getItem('locale') ?? 'EN';
    const dark = localStorage.getItem('dark') ?? 'false';
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newCheckedPassword, setNewCheckedPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');
    // 更新 state 中的密码
    const onOldPwdChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setOldPassword(e.target.value);
    };
    const onNewPwdChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewPassword(e.target.value);
    };
    const onNewPwdCheckedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewCheckedPassword(e.target.value);
    };
    const onNewEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewEmail(e.target.value);
    };
    const onNewUsernameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewUsername(e.target.value);
    };

    // const handleOpenPermsDialog = async () => {
    //     const permsRes = await postData('/getUserPerm', {
    //         castor_email: userInfoObj.email
    //     })
    //     if (permsRes.statusCode == 200) {
    //         const userPerms = JSON.stringify({
    //             'perms': permsRes.body
    //         })
    //         const byteArr = encoder.encode(userPerms);
    //         const base64UserPerms = btoa(String.fromCharCode(...byteArr));
    //         localStorage.setItem('GPUserPerms', base64UserPerms);
    //         setOpenPermsDialog(true);
    //     }
    // };

    const handleSaveUserInfo = async () => {
        if (newEmail == '' && newUsername == '') {
            // 弹出通知
            openNotification({
                message: generalText.tip[locale],
                description: userPage.nullEmailAndUsername[locale],
                icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
            })
        } else {
            const reqRes = await postData('/updateUserInfo', {
                castor_email: userInfoObj.email,
                castor_newEmail: newEmail == '' ? userInfoObj.email : newEmail,
                castor_newUsername: newUsername == '' ? userInfoObj.username : newUsername,
            })
            if (reqRes.statusCode == 200) {
                const userInfo = JSON.stringify({
                    'avatar': userInfoObj.avatar,
                    'username': newUsername == '' ? userInfoObj.username : newUsername,
                    'email': newEmail == '' ? userInfoObj.email : newEmail,
                });
                const byteArr = encoder.encode(userInfo);
                const base64UserInfo = btoa(String.fromCharCode(...byteArr));
                localStorage.setItem('GPUserInfo', base64UserInfo);
                // 弹出通知
                openNotification({
                    message: generalText.tip[locale],
                    description: generalText.saveSuccess[locale],
                    icon: <CheckCircleFilled style={{color: '#00ff00'}}/>
                })
            } else if (reqRes.statusCode == 401) {
                // 弹出通知
                openNotification({
                    message: generalText.tip[locale],
                    description: generalText.saveFailed[locale],
                    icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
                })
            }
        }
    }

    const handleSavePassword = async () => {
        if (newPassword != newCheckedPassword) {
            // 弹出通知
            openNotification({
                message: generalText.tip[locale],
                description: userPage.passwordNotMatch[locale],
                icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
            })
        } else {
            const reqRes = await postData('/updateUserInfo', {
                castor_email: userInfoObj.email,
                castor_password: oldPassword,
                castor_newPassword: newPassword,
            })
            const statusCode = reqRes.statusCode;
            if (statusCode === 200) {
                openNotification({
                    message: generalText.tip[locale],
                    description: generalText.saveSuccess[locale],
                    icon: <CheckCircleFilled style={{color: '#00ff00'}}/>
                });
            } else {
                openNotification({
                    message: generalText.tip[locale],
                    description: generalText.saveFailed[locale],
                    icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
                });
            }
        }
    }

    const onClose = () => {
        setOpenPermsDialog(false);
    };

    useEffect(() => {
    }, []);

    return (
        <>
            <div
                style={{width: "100%", display: "flex", flexDirection: "row-reverse", justifyContent: "space-between"}}>
                <div style={{width: "45%"}}>
                    <div style={{fontSize: "x-large", fontWeight: "bold"}}>{userPage.changePassword[locale]}</div>
                    <div style={{
                        backgroundColor: dark === 'false' ? "#f5f5f5" : "#1a1a1a",
                        marginTop: "20px",
                        padding: "15px 15px",
                        borderRadius: "10px",
                        width: "100%"
                    }}>
                        <div style={{marginBottom: "10px"}}>{userPage.currentPassword[locale]}</div>
                        {/*<input type="password" style={{width: "50%", height: "40px", marginTop: "10px"}}/>*/}
                        <Input.Password
                            className="input"
                            size="large"
                            allowClear
                            onChange={onOldPwdChange}
                            style={{backgroundColor: dark === 'false' ? "#f5f5f5" : "#1a1a1a"}}
                        />
                        <div style={{marginBottom: "10px"}}>{userPage.newPassword[locale]}</div>
                        {/*<input type="password" style={{width: "50%", height: "40px", marginTop: "10px"}}/>*/}
                        <Input.Password
                            className="input"
                            size="large"
                            allowClear
                            onChange={onNewPwdChange}
                            style={{backgroundColor: dark === 'false' ? "#f5f5f5" : "#1a1a1a"}}
                        />
                        <div style={{marginBottom: "10px"}}>{userPage.confirmNewPassword[locale]}</div>
                        {/*<input type="password" style={{width: "50%", height: "40px", marginTop: "10px"}}/>*/}
                        <Input.Password
                            className="input"
                            size="large"
                            allowClear
                            onChange={onNewPwdCheckedChange}
                            style={{backgroundColor: dark === 'false' ? "#f5f5f5" : "#1a1a1a"}}
                        />
                        <Button type="primary" size="large" onClick={handleSavePassword}>
                            {generalText.save[locale]}
                        </Button>
                    </div>
                </div>
                <div style={{width: "45%"}}>
                    <div style={{fontSize: "x-large", fontWeight: "bold"}}>{userPage.userInfo[locale]}</div>
                    <div style={{
                        backgroundColor: dark === 'false' ? "#f5f5f5" : "#1a1a1a",
                        marginTop: "20px",
                        padding: "15px 15px",
                        borderRadius: "10px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                    }}>
                        {userInfoObj.avatar == 'null' ? <img src={userSvg} alt="userIcon"
                                                             style={{
                                                                 height: "100px",
                                                                 width: "100px",
                                                                 borderRadius: '50%'
                                                             }}/> :
                            <img src={userInfoObj.avatar} alt="userIcon"
                                 style={{height: "100px", width: "100px", borderRadius: '50%'}}/>
                        }
                        <div style={{
                            marginLeft: "30px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            width: "100%"
                        }}>
                            <div style={{
                                fontSize: "large",
                                fontWeight: "bolder",
                                marginBottom: "10px"
                            }}>{userPage.email[locale]}</div>
                            <Input
                                className="input"
                                size="large"
                                placeholder={userInfoObj.email}
                                allowClear
                                onChange={onNewEmailChange}
                                onPressEnter={handleSaveUserInfo}
                                style={{backgroundColor: dark === 'false' ? "#f5f5f5" : "#1a1a1a"}}
                            />
                            <div
                                style={{
                                    fontSize: "large",
                                    fontWeight: "bolder",
                                    marginBottom: "10px",
                                    width: "100%"
                                }}>{userPage.username[locale]}
                            </div>
                            <Input
                                className="input"
                                size="large"
                                placeholder={userInfoObj.username}
                                allowClear
                                onChange={onNewUsernameChange}
                                onPressEnter={handleSaveUserInfo}
                                style={{backgroundColor: dark === 'false' ? "#f5f5f5" : "#1a1a1a"}}
                            />
                            <Button type="primary" size="large" style={{width: "75px"}}
                                    onClick={handleSaveUserInfo}>{generalText.save[locale]}</Button>
                            {/*<div style={{*/}
                            {/*    fontSize: "large",*/}
                            {/*    fontWeight: "bolder",*/}
                            {/*    marginTop: "10px",*/}
                            {/*    marginBottom: "10px"*/}
                            {/*}}>{userPage.userPerms[locale]}</div>*/}
                            {/*<Button type="primary" size="large" onClick={handleOpenPermsDialog}>*/}
                            {/*    {generalText.peek[locale]}*/}
                            {/*</Button>*/}
                        </div>
                    </div>
                </div>
            </div>
            <Drawer
                title={permissionsList.permissionsDrawerTitle[locale]}
                placement='bottom'
                width={500}
                onClose={onClose}
                open={openPermsDialog}
                size={"large"}
                // extra={
                //     <Space>
                //         <Button onClick={onClose}>Cancel</Button>
                //         <Button type="primary" onClick={onClose}>
                //             Save
                //         </Button>
                //     </Space>
                // }
            >
                <div className="permsDrawer">
                    <div className="permsDrawerItem">
                        <div className="permsDrawerItemTitle">{permissionsList.adminPermissionsTitle[locale]}</div>
                        <div style={{
                            width: "100%",
                            marginTop: "10px"
                        }}>
                            <List itemLayout="horizontal" dataSource={adminPerms(locale)} renderItem={(item) => (
                                <List.Item>
                                    <div>{item.title}</div>
                                    <Switch
                                        disabled={true}
                                        checkedChildren={<CheckOutlined/>}
                                        unCheckedChildren={<CloseOutlined/>}
                                        checked={item.permsStatus}
                                    />
                                </List.Item>
                            )}>
                            </List>
                        </div>
                    </div>
                    <div className="permsDrawerItem">
                        <div className="permsDrawerItemTitle">{permissionsList.instPermissionsTitle[locale]}</div>
                        <div style={{
                            width: "100%",
                            marginTop: "10px"
                        }}>
                            <List itemLayout="horizontal" dataSource={instPerms(locale)} renderItem={(item) => (
                                <List.Item>
                                    <div>{item.title}</div>
                                    <Switch
                                        disabled={true}
                                        checkedChildren={<CheckOutlined/>}
                                        unCheckedChildren={<CloseOutlined/>}
                                        checked={item.permsStatus}
                                    />
                                </List.Item>
                            )}>
                            </List>
                        </div>
                    </div>
                    <div className="permsDrawerItem">
                        <div className="permsDrawerItemTitle">{permissionsList.filePermissionsTitle[locale]}</div>
                        <div style={{
                            width: "100%",
                            marginTop: "10px"
                        }}>
                            <List itemLayout="horizontal" dataSource={filePerms(locale)} renderItem={(item) => (
                                <List.Item>
                                    <div>{item.title}</div>
                                    <Switch
                                        disabled={true}
                                        checkedChildren={<CheckOutlined/>}
                                        unCheckedChildren={<CloseOutlined/>}
                                        checked={item.permsStatus}
                                    />
                                </List.Item>
                            )}>
                            </List>
                        </div>
                    </div>
                    <div className="permsDrawerItem">
                        <div className="permsDrawerItemTitle">{permissionsList.bakPermissionsTitle[locale]}</div>
                        <div style={{
                            width: "100%",
                            marginTop: "10px"
                        }}>
                            <List itemLayout="horizontal" dataSource={bakPerms(locale)} renderItem={(item) => (
                                <List.Item>
                                    <div>{item.title}</div>
                                    <Switch
                                        disabled={true}
                                        checkedChildren={<CheckOutlined/>}
                                        unCheckedChildren={<CloseOutlined/>}
                                        checked={item.permsStatus}
                                    />
                                </List.Item>
                            )}>
                            </List>
                        </div>
                    </div>
                    <div className="permsDrawerItem">
                        <div className="permsDrawerItemTitle">{permissionsList.netPermissionsTitle[locale]}</div>
                        <div style={{
                            width: "100%",
                            marginTop: "10px"
                        }}>
                            <List itemLayout="horizontal" dataSource={netPerms(locale)} renderItem={(item) => (
                                <List.Item>
                                    <div>{item.title}</div>
                                    <Switch
                                        disabled={true}
                                        checkedChildren={<CheckOutlined/>}
                                        unCheckedChildren={<CloseOutlined/>}
                                        checked={item.permsStatus}
                                    />
                                </List.Item>
                            )}>
                            </List>
                        </div>
                    </div>
                    <div className="permsDrawerItem">
                        <div className="permsDrawerItemTitle">{permissionsList.dbPermissionsTitle[locale]}</div>
                        <div style={{
                            width: "100%",
                            marginTop: "10px"
                        }}>
                            <List itemLayout="horizontal" dataSource={dbPerms(locale)} renderItem={(item) => (
                                <List.Item>
                                    <div>{item.title}</div>
                                    <Switch
                                        disabled={true}
                                        checkedChildren={<CheckOutlined/>}
                                        unCheckedChildren={<CloseOutlined/>}
                                        checked={item.permsStatus}
                                    />
                                </List.Item>
                            )}>
                            </List>
                        </div>
                    </div>
                    <div className="permsDrawerItem">
                        <div className="permsDrawerItemTitle">{permissionsList.taskPermissionsTitle[locale]}</div>
                        <div style={{
                            width: "100%",
                            marginTop: "10px"
                        }}>
                            <List itemLayout="horizontal" dataSource={taskPerms(locale)} renderItem={(item) => (
                                <List.Item>
                                    <div>{item.title}</div>
                                    <Switch
                                        disabled={true}
                                        checkedChildren={<CheckOutlined/>}
                                        unCheckedChildren={<CloseOutlined/>}
                                        checked={item.permsStatus}
                                    />
                                </List.Item>
                            )}>
                            </List>
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    )
};

export default UserPage;