import {Button, Drawer, Input, Popconfirm, Space, Table} from "antd";
import React, {useEffect, useState} from "react";
import {postData} from "../../pages/assets/ts/req.ts";
import {DBHListType} from "../../pages/assets/ts/type.ts";
import {CheckCircleFilled, CloseCircleFilled, DeleteOutlined} from "@ant-design/icons";
import {useNotification} from "../notification.tsx";
import {generalText, settingsPage} from "../../pages/assets/ts/locale.ts";

interface DBHListProps {
    CastorEmail: string;
}

const DBHList: React.FC<DBHListProps> = ({CastorEmail}) => {

    const locale = localStorage.getItem('locale') ?? 'EN';
    const openNotification = useNotification();
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    // const [polluxNode, setPolluxNode] = useState('');
    const [DBHName, setDBHName] = useState('');
    const [DBHIP, setDBHIP] = useState('');
    const [DBHPort, setDBHPort] = useState('');
    const [DBHUsername, setDBHUsername] = useState('');
    const [DBHPassword, setDBHPassword] = useState('');
    const [dataSource, setDataSource] = useState<DBHListType[]>([]);
    const columns = [
        {
            title: settingsPage.polluxDBHName[locale],
            dataIndex: 'DBH_Name',
            key: 'DBH_Name',
        },
        {
            title: settingsPage.polluxDBHIP[locale],
            dataIndex: 'DBH_IP',
            key: 'DBH_IP',
        },
        {
            title: settingsPage.polluxDBHPort[locale],
            dataIndex: 'DBH_Port',
            key: 'DBH_Port',
        },
        {
            title: settingsPage.polluxDBHUsername[locale],
            dataIndex: 'DBH_Username',
            key: 'DBH_Username',
        },
        {
            title: settingsPage.polluxDBHUUID[locale],
            dataIndex: 'DBH_UUID',
            key: 'DBH_UUID',
        },
        {
            title: settingsPage.polluxDBHAction[locale],
            dataIndex: 'action',
            key: 'action',
        }
    ];

    async function fetchData() {
        const formData = new FormData()
        formData.append("CastorEmail", CastorEmail)
        formData.append("Operation", "listDBH")
        postData("/dbManage", formData).then((res) => {
            if (res.statusCode === 200) {
                setLoading(false)
                const dataAttr: DBHListType[] = [];
                (res.body as { DBHList: DBHListType[] }).DBHList.forEach((item: DBHListType) => {
                    dataAttr.push({
                        key: item.DBH_UUID,
                        DBH_UUID: item.DBH_UUID,
                        DBH_Name: item.DBH_Name,
                        DBH_IP: item.DBH_IP,
                        DBH_Port: item.DBH_Port,
                        DBH_Username: item.DBH_Username,
                        action:
                            <Popconfirm
                                key="delete"
                                title="delete dbh"
                                description="Are you sure to delete this dbh?"
                                onConfirm={() => {
                                    postData("/dbManage", {
                                        CastorEmail: CastorEmail,
                                        Operation: "delDBH",
                                        DBHUUID: item.DBH_UUID
                                    }).then((res) => {
                                        if (res.statusCode === 200) {
                                            // 弹出通知
                                            openNotification({
                                                message: generalText.tip[locale],
                                                description: generalText.deleteSuccess[locale],
                                                icon: <CheckCircleFilled style={{color: '#00ff00'}}/>
                                            })
                                            fetchData()
                                            location.reload()
                                            return
                                        }
                                        // 弹出通知
                                        openNotification({
                                            message: generalText.tip[locale],
                                            description: generalText.deleteFailed[locale],
                                            icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
                                        })
                                    })
                                }}
                                onCancel={() => {
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button danger type="link" icon={<DeleteOutlined key="delete"/>}></Button>
                            </Popconfirm>
                    })
                });
                setDataSource(dataAttr)
            }
        })
    }

    function handleCloseDialog() {
        setOpenDialog(false)
    }

    useEffect(() => {
        fetchData()

    }, []);


    return (
        <>
            <h1>Database Host</h1>
            <Button onClick={() => {
                setOpenDialog(true)
            }}>{settingsPage.polluxDBHAdd[locale]}</Button>
            <Table loading={loading} dataSource={dataSource} columns={columns} size="large"
                   style={{marginTop: "20px"}}/>
            {/*    新增数据库主机弹窗*/}
            <Drawer
                title={settingsPage.polluxDBHAdd[locale]}
                placement="bottom"
                // width={50}
                size={"large"}
                onClose={handleCloseDialog}
                open={openDialog}
                extra={
                    <Space>
                        <Button type="primary" onClick={() => {
                            postData("/dbManage", {
                                CastorEmail: CastorEmail,
                                Operation: "addDBH",
                                DBHName: DBHName,
                                DBHIP: DBHIP,
                                DBHPort: DBHPort,
                                DBHUsername: DBHUsername,
                                DBHPassword: DBHPassword,
                                // DBHNodeUUID: polluxNode
                            }).then((res) => {
                                if (res.statusCode === 200) {
                                    // 弹出通知
                                    openNotification({
                                        message: generalText.tip[locale],
                                        description: generalText.saveSuccess[locale],
                                        icon: <CheckCircleFilled style={{color: '#00ff00'}}/>
                                    })
                                    handleCloseDialog()
                                    fetchData()
                                    return
                                }
                                // 弹出通知
                                openNotification({
                                    message: generalText.tip[locale],
                                    description: generalText.saveFailed[locale],
                                    icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
                                })
                            })
                        }}>{generalText.save[locale]}</Button>
                    </Space>
                }>
                <div>
                    {/*<div>数据库主机所属节点</div>*/}
                    {/*<Select*/}
                    {/*    showSearch*/}
                    {/*    size={"middle"}*/}
                    {/*    style={{width: "100%"}}*/}
                    {/*    placeholder="选择节点"*/}
                    {/*    optionFilterProp="label"*/}
                    {/*    onChange={(value: string) => {*/}
                    {/*        setPolluxNode(value)*/}
                    {/*    }*/}
                    {/*    }*/}
                    {/*    options={nodeList.map((item) => ({*/}
                    {/*        value: item.node_uuid,*/}
                    {/*        label: item.node_name*/}
                    {/*    }))}*/}
                    {/*/>*/}
                    <div>{settingsPage.polluxDBHName[locale]}</div>
                    <Input
                        size="large"
                        allowClear
                        style={{marginTop: "10px"}}
                        onChange={(value) => {
                            setDBHName(value.target.value)
                        }}
                    ></Input>
                    <div>{settingsPage.polluxDBHIP[locale]}</div>
                    <Input
                        size="large"
                        allowClear
                        style={{marginTop: "10px"}}
                        onChange={(value) => {
                            setDBHIP(value.target.value)
                        }}
                    ></Input>
                    <div>{settingsPage.polluxDBHPort[locale]}</div>
                    <Input
                        size="large"
                        allowClear
                        style={{marginTop: "10px"}}
                        onChange={(value) => {
                            setDBHPort(value.target.value)
                        }}
                    ></Input>
                    <div>{settingsPage.polluxDBHUsername[locale]}</div>
                    <Input
                        size="large"
                        allowClear
                        style={{marginTop: "10px"}}
                        onChange={(value) => {
                            setDBHUsername(value.target.value)
                        }}
                    ></Input>
                    <div>{settingsPage.polluxDBHPassword[locale]}</div>
                    <Input.Password
                        size="large"
                        allowClear
                        style={{marginTop: "10px"}}
                        onChange={(value) => {
                            setDBHPassword(value.target.value)
                        }}
                    ></Input.Password>
                </div>
            </Drawer>
        </>
    )
}

export default DBHList;