import React, {useEffect, useState} from "react";
import {postData} from "../../pages/assets/ts/req.ts";
import {Button, Drawer, Input, List, Modal, Select, Space} from "antd";
import {DBListType} from "../../pages/assets/ts/type.ts";
import {CheckCircleFilled, CloseCircleFilled, DatabaseFilled, DeleteFilled, EyeFilled} from "@ant-design/icons";
import {useNotification} from "../notification.tsx";
import {generalText} from "../../pages/assets/ts/locale.ts";

interface DBListProp {
    CastorEmail: string
    InstUUID: string
}

const DBList: React.FC<DBListProp> = ({CastorEmail, InstUUID}) => {
    const openNotification = useNotification();
    const locale = localStorage.getItem('locale') ?? 'EN';
    const [DBList, setDBList] = useState<DBListType[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [DBName, setDBName] = useState<string>("");
    const [DBInfo, setDBInfo] = useState<DBListType>({
        DBH_IP: "",
        DBH_Port: "",
        DB_Name: "",
        DB_Username: "",
        DB_Password: "",
        DB_UUID: ""
    });
    const [DBH_UUIDs, setDBH_UUIDs] = useState<{ DBH_UUID: string, DBH_Name: string }[]>([]);
    const [DBH_UUID, setDBH_UUID] = useState<string>("")

    function handleModalOpen(isOpen: boolean) {
        setModalOpen(isOpen);
    }

    function handleDialogOpen(isOpen: boolean) {
        setOpenDialog(isOpen);
    }

    function fetchDBList() {
        postData("/dbManage", {
            CastorEmail: CastorEmail,
            Operation: "listDB",
            InstUUID: InstUUID
        }).then((res) => {
            const DBList = (res.body as { DBList: DBListType[] }).DBList
            if (DBList != null) {
                setDBList(DBList)
            }
            const DBHUUIDs = (res.body as { DBHUUIDs: { DBH_UUID: string, DBH_Name: string }[] }).DBHUUIDs
            if (DBHUUIDs != null) {
                setDBH_UUIDs(DBHUUIDs)
            }
        })
    }

    useEffect(() => {
        fetchDBList()
    }, []);

    return (
        <div>
            <Button onClick={() => {
                handleDialogOpen(true)
            }}>New</Button>
            <List
                itemLayout="horizontal"
                dataSource={DBList}
                renderItem={(item) => (
                    <List.Item style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textAlign: "left"
                    }}>
                        <div style={{
                            flex: 2,
                            textAlign: "left",
                            display: "flex",
                            gap: "1rem"
                        }}>
                            <DatabaseFilled/>{item.DB_Name}</div>
                        <div style={{flex: 2, textAlign: "left"}}>{item.DBH_IP}:{item.DBH_Port}</div>
                        <div style={{flex: 2, textAlign: "left"}}>{item.DB_Username}</div>
                        <div style={{
                            flex: 2,
                            textAlign: "right",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "end",
                            gap: "1rem"
                        }}>
                            <Button onClick={() => {
                                setDBInfo(item)
                                handleModalOpen(true)
                            }}>
                                <EyeFilled/>
                            </Button>
                            <Button
                                onClick={() => {
                                    postData("/dbManage", {
                                        CastorEmail: CastorEmail,
                                        Operation: "delDB",
                                        InstUUID: InstUUID,
                                        DBUUID: item.DB_UUID
                                    }).then((res) => {
                                        if (res.statusCode === 200) {
                                            // 弹出通知
                                            openNotification({
                                                message: generalText.tip[locale],
                                                description: generalText.deleteSuccess[locale],
                                                icon: <CheckCircleFilled style={{color: '#00ff00'}}/>
                                            })
                                            location.reload()
                                            fetchDBList()
                                        } else {
                                            // 弹出通知
                                            openNotification({
                                                message: generalText.tip[locale],
                                                description: generalText.deleteFailed[locale],
                                                icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
                                            })
                                        }
                                    })
                                }}
                                type="default"
                                style={{color: "red", borderColor: "red"}}>
                                <DeleteFilled/>
                            </Button>
                        </div>
                    </List.Item>
                )}>
            </List>
            <Modal title="数据库信息" open={modalOpen} footer={
                <Button type="primary" onClick={() => {
                    handleModalOpen(false)
                }}>
                    OK
                </Button>
            }>
                <div>数据库地址: {DBInfo.DBH_IP}:{DBInfo.DBH_Port}</div>
                <div>数据库名: {DBInfo.DB_Name}</div>
                <div>用户名: {DBInfo.DB_Username}</div>
                <div>密码: {DBInfo.DB_Password}</div>
                <div>UUID: {DBInfo.DB_UUID}</div>
            </Modal>
            <Drawer
                title="新增数据库"
                placement="bottom"
                size={"default"}
                onClose={() => {
                    handleDialogOpen(false)
                }}
                open={openDialog}
                extra={
                    <Space>
                        <Button type="primary" onClick={() => {
                            postData("/dbManage", {
                                CastorEmail: CastorEmail,
                                Operation: "addDB",
                                InstUUID: InstUUID,
                                DBName: DBName,
                                DBHUUID: DBH_UUID
                            }).then((res) => {
                                if (res.statusCode === 200) {
                                    // 弹出通知
                                    openNotification({
                                        message: generalText.tip[locale],
                                        description: generalText.saveSuccess[locale],
                                        icon: <CheckCircleFilled style={{color: '#00ff00'}}/>
                                    })
                                    fetchDBList()
                                    handleDialogOpen(false)
                                    location.reload()
                                    return
                                }
                                // 弹出通知
                                openNotification({
                                    message: generalText.tip[locale],
                                    description: generalText.saveFailed[locale],
                                    icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
                                })
                            })
                        }}>保存</Button>
                    </Space>
                }>
                <div>
                    <div>所属数据库主机</div>
                    <Select
                        showSearch
                        size={"middle"}
                        style={{width: "100%"}}
                        placeholder="Select a DB host"
                        optionFilterProp="label"
                        onChange={(value: string) => {
                            setDBH_UUID(value)
                        }
                        }
                        options={DBH_UUIDs.map((item) => {
                            return {label: item.DBH_Name, value: item.DBH_UUID}
                        })}
                    />
                    <div>数据库名</div>
                    <Input
                        size="large"
                        placeholder="数据库名"
                        allowClear
                        style={{marginTop: "10px"}}
                        onChange={(value) => {
                            setDBName(value.target.value)
                        }}
                    ></Input>
                </div>
            </Drawer>
        </div>
    );
}

export default DBList;