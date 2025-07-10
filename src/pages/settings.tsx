import React, {useEffect, useRef, useState} from 'react';
import {
    CheckCircleFilled, CheckOutlined,
    CloseCircleFilled, CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    SettingOutlined
} from '@ant-design/icons';
import {
    Avatar,
    Badge,
    Button,
    Card,
    Drawer,
    Input, InputNumber,
    List,
    MenuProps,
    Popconfirm,
    Popover,
    Progress,
    Select,
    Space, Switch
} from 'antd';
import {Menu} from 'antd';
import {generalText, settingsPage} from "./assets/ts/locale.ts";
import {postData} from "./assets/ts/req.ts";
import {nodeInfoType, systemInfoType} from "./assets/ts/type.ts";
import type {ProgressProps, SelectProps} from 'antd';
import windows from "./assets/img/windows.svg";
import linux from "./assets/img/linux.svg";
import ubuntu from "./assets/img/ubuntu.svg";
import debian from "./assets/img/debian.svg";
import centos from "./assets/img/centos.svg";
import {useNotification} from "../components/notification.tsx";
import InstsList from "./instsList.tsx";
import Overview from "../components/settingCastor/Overview.tsx";
import DBHList from "../components/settingPollux/DBHList.tsx";

type MenuItem = Required<MenuProps>['items'][number];

async function fetchSystemInfo(targetHostIP?: string, targetHostPort?: number) {
    try {
        return await postData('/getSystemInfo', {
            targetHostIP: targetHostIP ? targetHostIP : 'localhost',
            targetHostPort: targetHostPort ? targetHostPort : 621
        })
    } catch (err) {
        console.log(err)
    }
}

const options: SelectProps['options'] = [];

for (let i = 10000; i < 20000; i++) {
    options.push({
        label: i,
        value: i,
    });
}

const Settings: React.FC = () => {
    const locale = localStorage.getItem('locale') ?? 'EN';
    const dark = localStorage.getItem('dark') ?? 'false';
    const [currentMenuKey, setCurrentMenuKey] = useState('Castor:1');
    const [systemInfo, setSystemInfo] = useState<systemInfoType>();
    const [nodeInfo, setNodeInfo] = useState<systemInfoType | undefined>(undefined);
    const [dialogTitle, setDialogTitle] = useState('');
    const [op, setOp] = useState('');
    const intervalRef = useRef<number | null>(null);
    const openNotification = useNotification();
    const decoder = new TextDecoder();
    const userInfoString = decoder.decode(Uint8Array.from(atob(localStorage.getItem('GPUserInfo') as string), char => char.charCodeAt(0)));
    const userInfoObj = JSON.parse(userInfoString);
    const [nodeList, setNodeList] = useState<nodeInfoType[]>([]);
    const [openNodeAddDialog, setOpenNodeAddDialog] = useState(false);
    const [openInstAddDialog, setOpenInstAddDialog] = useState(false);
    const conicColors: ProgressProps['strokeColor'] = {
        '0%': '#87d068',
        '50%': '#ffe58f',
        '100%': '#fc5e50',
    };
    // const [deleteButtonColor, setDeleteButtonColor] = useState('gray');
    const items: MenuItem[] = [
        {
            label: settingsPage.castorMainMenuTitle[locale],
            key: 'Castor',
            icon: <SettingOutlined/>,
            children: [
                {label: settingsPage.castorSubMenuOverview[locale], key: 'Castor:1'},
                // Developing in progress
                // {label: settingsPage.castorSubMenuSettings[locale], key: 'Castor:2'},
                // {label: settingsPage.castorSubMenuUser[locale], key: 'Castor:3'},
                // {label: '应用API', key: 'basic:3'},
            ],
        }, {
            label: settingsPage.polluxMainMenuTitle[locale],
            key: 'Pollux',
            icon: <SettingOutlined/>,
            children: [
                {label: settingsPage.polluxSubMenuNode[locale], key: 'Pollux:1'},
                {label: settingsPage.polluxSubMenuInstance[locale], key: 'Pollux:2'},
                {label: settingsPage.polluxSubMenuDatabase[locale], key: 'Pollux:3'},
            ],
        },
        // Developing in progress
        // {
        //     label: settingsPage.serviceMainMenuTitle[locale],
        //     key: 'Service',
        //     icon: <SettingOutlined/>,
        //     children: [
        //         {label: settingsPage.serviceSubMenuMount[locale], key: 'service:1'},
        //         {label: settingsPage.serviceSubMenuPresetGroup[locale], key: 'service:2'},
        //     ],
        // },
    ];
    const confirmNodeDel = () => {
        postData("/nodeDelete", {
            castor_email: userInfoObj.email,
            node_uuid: nodeUUID
        }).then((res) => {
            if (res != undefined && res.statusCode === 200) {
                fetchNodeList()
                // 弹出通知
                openNotification({
                    message: generalText.tip[locale],
                    description: generalText.deleteSuccess[locale],
                    icon: <CheckCircleFilled style={{color: '#00ff00'}}/>
                })
            } else {
                // 弹出通知
                openNotification({
                    message: generalText.tip[locale],
                    description: generalText.deleteFailed[locale],
                    icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
                })
            }
        })
    }
    const nodeActions = (node_name: string, node_ip: string, node_port: number, node_uuid: string): React.ReactNode[] => [
        <EditOutlined key="edit" onClick={() => {
            setNodeName(node_name);
            setNodeIP(node_ip);
            setNodePort(node_port.toString());
            setNodeUUID(node_uuid);
            setDialogTitle(settingsPage.polluxNodeEdit[locale]);
            setOp('edit');
            setOpenNodeAddDialog(true);
        }}/>,
        <Popconfirm
            key="delete"
            title={settingsPage.polluxNodeDelete[locale]}
            description={generalText.deleteConfirm[locale]}
            onConfirm={confirmNodeDel}
            onCancel={() => {
            }}
            okText="Yes"
            cancelText="No"
        >
            <Button danger type="link" icon={<DeleteOutlined key="delete" onClick={() => {
                setNodeUUID(node_uuid);
            }}/>}></Button>
        </Popconfirm>
    ];
    const [loading, setLoading] = useState<boolean>(true);
    const [nodeName, setNodeName] = useState('');
    const [nodeIP, setNodeIP] = useState('');
    const [nodePort, setNodePort] = useState('');
    const [nodeUUID, setNodeUUID] = useState('');
    const [nodeAuthToken, setNodeAuthToken] = useState('');
    const onNodeNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNodeName(e.target.value);
    };
    const onNodeIPChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNodeIP(e.target.value);
    };
    const onNodePortChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNodePort(e.target.value);
    };
    const onNodeAuthTokenChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNodeAuthToken(e.target.value);
    };
    const onAddOrEditNode = (op: string) => {
        postData('/nodeAddOrEdit', {
            op: op,
            castor_email: userInfoObj.email,
            node_name: nodeName,
            node_ip: nodeIP,
            node_port: nodePort,
            node_AuthToken: nodeAuthToken,
            node_uuid: nodeUUID
        }).then((res) => {
            if (res != undefined && res.statusCode === 200) {
                fetchNodeList()
                // 弹出通知
                openNotification({
                    message: generalText.tip[locale],
                    description: generalText.saveSuccess[locale],
                    icon: <CheckCircleFilled style={{color: '#00ff00'}}/>
                })
                onClose();
                setNodeIP('');
                setNodeName('');
                setNodePort('');
            } else {
                // 弹出通知
                openNotification({
                    message: generalText.tip[locale],
                    description: generalText.saveFailed[locale],
                    icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
                })
            }
        })
    };

    const [instGame, setInstGame] = useState('');
    const [eula, setEula] = useState<boolean>(false);
    const [setUpOnly, setSetUpOnly] = useState<boolean>(false);
    const [image, setImage] = useState('');
    const [polluxNode, setPolluxNode] = useState('');
    const [instanceName, setInstanceName] = useState('');
    const [instanceDescription, setInstanceDescription] = useState('');
    const [port, setPort] = useState<string[]>([]);
    const [maxMem, setMaxMem] = useState<string>('3');
    const [maxDisk, setMaxDisk] = useState<string>('3');
    const [coreType, setCoreType] = useState('');
    const [coreFile, setCoreFile] = useState('');
    const [coreVersion, setCoreVersion] = useState('')

    const onClose = () => {
        setOpenNodeAddDialog(false);
    };

    const handleOpenNodeAddDialog = () => {
        setDialogTitle(settingsPage.polluxNodeAdd[locale]);
        setNodeName('Pollux Node Name')
        setNodeIP('127.0.0.1')
        setNodePort('621')
        setOp('add');
        setOpenNodeAddDialog(true);
    }

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrentMenuKey(e.key);
    };

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // const throttledSetFakeTerminal = throttle((message: string) => {
    //     setFakeTerminal((prevMessages) => [...prevMessages, message]);
    // }, 100)

    const fetchNodeList = async () => {
        try {
            const res = await postData('/nodesList', {
                castor_email: userInfoObj.email,
            });

            if (res !== undefined && res.statusCode === 200) {
                const fetchNodeRes = (res.body as { nodeList: nodeInfoType[] }).nodeList;
                setNodeList(fetchNodeRes);
                setLoading(false);

                const checkAllNodes = async () => {
                    for (const checkNodeList of fetchNodeRes) {
                        try {
                            const healthRes = await postData('/checkNodeHealth', {
                                castor_email: userInfoObj.email,
                                checkNodeIP: checkNodeList.node_ip,
                                checkNodePort: checkNodeList.node_port,
                                checkNodeUUID: checkNodeList.node_uuid,
                            });
                            if (healthRes != undefined && healthRes.statusCode === 200) {
                                checkNodeList.node_health = true;
                                // setNodeList([...fetchNodeRes]); // 更新节点列表
                                setNodeList(prevNodeList =>
                                    prevNodeList.map(node =>
                                        node.node_uuid === checkNodeList.node_uuid ? {...node, node_health: true} : node
                                    )
                                );
                            }
                        } catch {
                            console.error(`Error checking health for ${checkNodeList.node_uuid}`);
                        }

                        // 每个节点检查后等待 5 秒
                        await delay(5000);
                    }
                };

                // 定义一个函数，定时执行节点健康检查
                const startHealthCheckInterval = () => {
                    setInterval(async () => {
                        console.log("Starting a new node health check cycle...");
                        await checkAllNodes(); // 遍历所有节点并检查健康
                        console.log("Node health check cycle complete.");
                    }, 10000); // 每 15 秒执行一次整个遍历过程
                };

                // 启动健康检查的定时任务
                startHealthCheckInterval();
            }
        } catch (error) {
            console.error("Error fetching node list:", error);
        }
    };

    useEffect(() => {
        fetchNodeList().catch((error) => {
            console.error("Error fetching node list:", error);
        });

        // 定义一个函数用于获取系统信息
        const fetchAndSetSystemInfo = async () => {
            try {
                const castorSysInfoRes = await fetchSystemInfo();
                if (castorSysInfoRes != undefined && castorSysInfoRes.statusCode === 200) {
                    setSystemInfo((castorSysInfoRes.body as { systemInfo: systemInfoType }).systemInfo);
                }
            } catch (error) {
                console.error("Error fetching system info:", error);
            }
        };

        // 每5秒获取一次系统信息
        const fetchSysInfoInterval = setInterval(() => {
            fetchAndSetSystemInfo().catch((error) => {
                console.error("Error fetching system info:", error);
            });
        }, 3000);

        // 清除定时器，防止组件卸载时内存泄漏
        return () => {
            clearInterval(fetchSysInfoInterval);
        }
    }, []);

    return (
        <>
            {userInfoObj.isAdmin === 1 ?
                <div>
                    <Menu defaultSelectedKeys={['Castor:1']} mode="horizontal" items={items} onClick={onClick}
                          style={{backgroundColor: dark === 'false' ? "#ffffff" : "#1a1a1a"}}/>
                    <div style={{padding: "15px"}}>
                        {currentMenuKey === 'Castor:1' &&
                            <Overview systemInfo={systemInfo}/>
                        }
                        {currentMenuKey === 'Castor:2' &&
                            <div>Castor:2</div>
                        }
                        {currentMenuKey === 'Castor:3' &&
                            <div>Castor:3</div>
                        }
                        {currentMenuKey === 'Pollux:1' &&
                            <div>
                                <div>
                                    <h1>Node</h1>
                                </div>
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                    {/*<div>节点列表</div>*/}
                                    {userInfoObj.isAdmin === 1 ?
                                        <Button
                                            onClick={handleOpenNodeAddDialog}>{settingsPage.polluxNodeAdd[locale]}</Button> : null}
                                </div>
                                <List
                                    style={{marginTop: "20px"}}
                                    grid={{
                                        gutter: 16,
                                        xs: 1,
                                        sm: 1,
                                        md: 1,
                                        lg: 2,
                                        xl: 2,
                                        xxl: 3,
                                    }}
                                    dataSource={nodeList}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Popover title="Node Detail" placement="rightTop"
                                                     key={item.node_uuid}
                                                     content={
                                                         <div style={{
                                                             display: 'flex',
                                                             flexDirection: "column",
                                                             justifyContent: "space-around",
                                                             marginTop: "10px"
                                                         }}>
                                                             {/*CPU*/}
                                                             <div style={{
                                                                 display: "flex",
                                                                 flexDirection: "column",
                                                                 alignItems: "center",
                                                                 justifyContent: "center"
                                                             }}>
                                                                 <Progress
                                                                     percent={item.node_health ? nodeInfo ? Math.ceil(nodeInfo.cpuLoad * 100) / 100 : 0 : 0}
                                                                     size="small" status="active" success={{percent: 0}}
                                                                     strokeColor={conicColors}/>
                                                                 <p>CPU Usage</p>
                                                             </div>
                                                             {/*Mem*/}
                                                             <div style={{
                                                                 display: "flex",
                                                                 flexDirection: "column",
                                                                 alignItems: "center",
                                                                 justifyContent: "center"
                                                             }}>
                                                                 <Progress
                                                                     percent={item.node_health ? nodeInfo ? Math.ceil((nodeInfo.usedMem / nodeInfo.totalMem) * 100) : 0 : 0}
                                                                     size="small" status="active"
                                                                     success={{percent: 0}}
                                                                     strokeColor={conicColors}/>
                                                                 <p>Memory Usage</p>
                                                             </div>
                                                             {/*Disk*/}
                                                             <div style={{
                                                                 display: "flex",
                                                                 flexDirection: "column",
                                                                 alignItems: "center",
                                                                 justifyContent: "center"
                                                             }}>
                                                                 <Progress
                                                                     percent={item.node_health ? nodeInfo ? Math.ceil((nodeInfo.usedDisk / nodeInfo.totalDisk) * 100) : 0 : 0}
                                                                     size="small" status="active"
                                                                     success={{percent: 0}}
                                                                     strokeColor={conicColors}/>
                                                                 <p>Disk Usage</p>
                                                             </div>
                                                         </div>
                                                     }>
                                                <Card loading={loading}
                                                      actions={nodeActions(item.node_name, item.node_ip, item.node_port, item.node_uuid)}
                                                      bordered={false}
                                                      hoverable={true}
                                                      onMouseEnter={item.node_health ? async () => {
                                                          intervalRef.current = setInterval(() => {
                                                              fetchSystemInfo(item.node_ip, item.node_port).then((res) => {
                                                                  if (res != undefined && res.statusCode === 200) {
                                                                      setNodeInfo((res.body as {
                                                                          systemInfo: systemInfoType
                                                                      }).systemInfo);
                                                                  }
                                                              })
                                                          }, 1500);
                                                      } : undefined}
                                                      onMouseLeave={() => {
                                                          if (intervalRef.current) {
                                                              clearInterval(intervalRef.current);
                                                              intervalRef.current = null; // 清空引用，避免重复清除
                                                          }
                                                      }}
                                                      style={{minWidth: 400, display: "flex", flexDirection: "column"}}>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "row"
                                                    }}>
                                                        <Card.Meta
                                                            style={{width: "100%"}}
                                                            avatar={item.node_os == "windows" ?
                                                                <Avatar shape="square"
                                                                        src={windows}/> : item.node_os == "ubuntu" ?
                                                                    <Avatar shape="square"
                                                                            src={ubuntu}/> : item.node_os == "debian" ?
                                                                        <Avatar shape="square"
                                                                                src={debian}/> : item.node_os == "centos" ?
                                                                            <Avatar shape="square" src={centos}/> :
                                                                            <Avatar shape="square" src={linux}/>}
                                                            title={item.node_name}
                                                            description={
                                                                <div>
                                                                    <p>{settingsPage.polluxNodeInstCount[locale]}:&ensp;{item.node_insts_count}</p>
                                                                    <p>{settingsPage.polluxNodeIP[locale]}:&ensp;{item.node_ip}</p>
                                                                    <p>{settingsPage.polluxNodePort[locale]}:&ensp;{item.node_port}</p>
                                                                    <p>{settingsPage.polluxNodeVer[locale]}:&ensp;{item.node_ver}</p>
                                                                    <p>{settingsPage.polluxNodeUUID[locale]}:&ensp;
                                                                        <br/>{item.node_uuid}</p>
                                                                </div>
                                                            }
                                                        />
                                                        {item.node_health ? <Badge status="success"/> :
                                                            <Badge status="error"/>}
                                                    </div>
                                                </Card>
                                            </Popover>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        }
                        {currentMenuKey === 'Pollux:2' &&
                            <div>
                                <div>
                                    <h1>Instance</h1>
                                </div>
                                <div>
                                    {userInfoObj.isAdmin === 1 ? <Button onClick={() => {
                                        setOpenInstAddDialog(true)
                                    }}>{settingsPage.polluxInstanceAdd[locale]}</Button> : null}
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: "10px"
                                }}>
                                    <InstsList style={{width: "100%"}} listAll="true"></InstsList>
                                    {/*<Popconfirm*/}
                                    {/*    title="Sure to do that?"*/}
                                    {/*    description="It will delete this instance"*/}
                                    {/*    onCancel={() => {*/}
                                    {/*        console.log("no")*/}
                                    {/*    }}*/}
                                    {/*    onConfirm={() => {*/}
                                    {/*        console.log("yes")*/}
                                    {/*    }}*/}
                                    {/*    okText="yes"*/}
                                    {/*    cancelText="no"*/}
                                    {/*>*/}
                                    {/*    <Button danger type="link" icon={<DeleteOutlined/>}></Button>*/}
                                    {/*</Popconfirm>*/}

                                </div>

                            </div>
                        }
                        {currentMenuKey === 'Pollux:3' &&
                            <DBHList CastorEmail={userInfoObj.email}/>
                        }
                        {currentMenuKey === 'service:1' &&
                            <div>service:1</div>
                        }
                        {currentMenuKey === 'service:2' &&
                            <div>service:2</div>
                        }
                    </div>
                </div>
                :
                <div>非法访问</div>}
            {/*添加节点控件*/}
            <Drawer
                // title={settingsPage.polluxNodeAdd[locale]}
                title={dialogTitle ? dialogTitle : "Minecraft is the best game in the world!"}
                placement='bottom'
                width={500}
                onClose={onClose}
                open={openNodeAddDialog}
                size={"large"}
                extra={
                    <Space>
                        <Button type="primary" onClick={() => {
                            onAddOrEditNode(op)
                        }}>
                            {generalText.save[locale]}
                        </Button>
                    </Space>
                }
            >
                <div>
                    <div>{settingsPage.polluxNodeName[locale]}</div>
                    <Input
                        size="large"
                        // placeholder="Pollux Node Name"
                        placeholder={nodeName}
                        allowClear
                        style={{marginTop: "10px"}}
                        onChange={onNodeNameChange}
                        // onPressEnter={handleSaveUserInfo}
                    />
                    <div style={{marginTop: "10px"}}>{settingsPage.polluxNodeIP[locale]}</div>
                    <Input
                        size="large"
                        // placeholder="127.0.0.1"
                        placeholder={nodeIP}
                        allowClear
                        style={{marginTop: "10px"}}
                        onChange={onNodeIPChange}
                        // onPressEnter={handleSaveUserInfo}
                    />
                    <div style={{marginTop: "10px"}}>{settingsPage.polluxNodePort[locale]}</div>
                    <Input
                        size="large"
                        // placeholder="621"
                        placeholder={nodePort}
                        allowClear
                        style={{marginTop: "10px"}}
                        onChange={onNodePortChange}
                        // onPressEnter={handleSaveUserInfo}
                    />
                    <div style={{marginTop: "10px"}}>{settingsPage.polluxNodeAuthToken[locale]}</div>
                    <Input.Password
                        size="large"
                        placeholder="$GPNAT-XXXXXX"
                        allowClear
                        style={{marginTop: "10px"}}
                        onChange={onNodeAuthTokenChange}
                    />
                </div>
            </Drawer>
            {/*添加实例控件*/}
            <Drawer
                // title={settingsPage.polluxNodeAdd[locale]}
                title={"Create New Instance"}
                placement='bottom'
                width={500}
                onClose={() => {
                    setOpenInstAddDialog(false)
                }}
                open={openInstAddDialog}
                size={"large"}
                extra={
                    <Space>
                        <Button type="primary" onClick={() => {
                            const data = {
                                castor_email: userInfoObj.email,
                                PolluxNode: polluxNode,
                                Game: instGame,
                                Eula: eula,
                                SetupOnly: setUpOnly,
                                ImageName: image,
                                InstanceName: instanceName,
                                InstanceDescription: instanceDescription,
                                Port: port,
                                MinMemory: "1",
                                MaxMemory: maxMem,
                                MinDisk: "1",
                                MaxDisk: maxDisk,
                                CoreType: coreType,
                                CoreFile: coreFile,
                                CoreVersion: coreVersion,
                                Operate: "add"
                            };
                            const formData = new FormData();
                            formData.append("castor_email", data.castor_email);
                            formData.append("InstNodeUUID", data.PolluxNode);
                            formData.append("InstGame", data.Game);
                            formData.append("InstEula", data.Eula.toString());
                            formData.append("InstSetupOnly", data.SetupOnly.toString());
                            formData.append("InstImageName", data.ImageName);
                            formData.append("InstName", data.InstanceName);
                            formData.append("InstDescription", data.InstanceDescription)
                            data.Port.forEach(port => formData.append("InstPorts", port));
                            formData.append("InstMinMem", data.MinMemory);
                            formData.append("InstMaxMem", data.MaxMemory.toString());
                            formData.append("InstMinDisk", data.MinDisk);
                            formData.append("InstMaxDisk", data.MaxDisk);
                            formData.append("CoreType", data.CoreType);
                            formData.append("CoreFile", data.CoreFile);
                            formData.append("CoreVersion", data.CoreVersion);
                            formData.append("Operate", data.Operate);
                            postData("/instAddDelEdit", formData).then(async (res) => {
                                if (res != undefined && res.statusCode === 200) {
                                    // 弹出通知
                                    openNotification({
                                        message: generalText.tip[locale],
                                        description: generalText.saveSuccess[locale],
                                        icon: <CheckCircleFilled style={{color: '#00ff00'}}/>
                                    })
                                    await delay(3000)
                                    //     刷新实例列表
                                    location.reload();
                                } else {
                                    // 弹出通知
                                    openNotification({
                                        message: generalText.tip[locale],
                                        description: generalText.saveFailed[locale],
                                        icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
                                    })
                                }
                            })
                        }}>
                            {generalText.save[locale]}
                        </Button>
                    </Space>
                }
            >
                <div>
                    <div>{settingsPage.polluxInstanceGame[locale]}</div>
                    <Select
                        showSearch
                        size={"middle"}
                        style={{width: "100%"}}
                        placeholder="Select a game"
                        optionFilterProp="label"
                        onChange={(value: string) => {
                            setInstGame(value)
                        }
                        }
                        options={[
                            {
                                value: 'minecraft',
                                label: 'Minecraft',
                            },
                        ]}
                    />
                    <div style={{marginTop: "10px"}}>EULA</div>
                    <Switch
                        checkedChildren={<CheckOutlined/>}
                        unCheckedChildren={<CloseOutlined/>}
                        checked={eula}
                        onChange={(value: boolean) => {
                            setEula(value)
                        }}
                    />
                    <div style={{marginTop: "10px"}}>{settingsPage.polluxInstanceNode[locale]}</div>
                    <Select
                        showSearch
                        size={"middle"}
                        style={{width: "100%"}}
                        placeholder="Select a image"
                        optionFilterProp="label"
                        onChange={(value: string) => {
                            setPolluxNode(value)
                        }
                        }
                        options={nodeList.map((item) => ({
                            value: item.node_uuid,
                            label: item.node_name
                        }))}
                    />
                    <div style={{marginTop: "10px"}}>{settingsPage.polluxInstancePort[locale]}</div>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{width: '100%'}}
                        placeholder="Please select"
                        // defaultValue={['a10', 'c12']}
                        onChange={(value) => {
                            setPort(value)
                        }}
                        options={options}
                    />
                    {
                        nodeList.map((item) => {
                            if (item.node_uuid == polluxNode && item.node_os != "windows") {
                                return (
                                    <div>
                                        <div
                                            style={{marginTop: "10px"}}>{settingsPage.polluxInstanceSetupOnly[locale]}</div>
                                        <Switch
                                            checkedChildren={<CheckOutlined/>}
                                            unCheckedChildren={<CloseOutlined/>}
                                            checked={setUpOnly}
                                            onChange={(value: boolean) => {
                                                setSetUpOnly(value)
                                            }}
                                        />
                                        <div style={{marginTop: "10px"}}>{settingsPage.polluxInstanceName[locale]}</div>
                                        <Input
                                            size="middle"
                                            // placeholder="621"
                                            placeholder={"instanceName"}
                                            allowClear
                                            style={{marginTop: "10px"}}
                                            onChange={(value) => {
                                                setInstanceName(value.target.value)
                                            }}
                                        />
                                        <div
                                            style={{marginTop: "10px"}}>{settingsPage.polluxInstanceDescription[locale]}</div>
                                        <Input
                                            size="middle"
                                            // placeholder="621"
                                            placeholder={"instanceDescription"}
                                            allowClear
                                            style={{marginTop: "10px"}}
                                            onChange={(value) => {
                                                setInstanceDescription(value.target.value)
                                            }}
                                        />
                                        {instGame == "minecraft" ?
                                            <div>
                                                <div
                                                    style={{marginTop: "10px"}}>{settingsPage.polluxInstanceImage[locale]}</div>
                                                <Select
                                                    showSearch
                                                    size={"middle"}
                                                    style={{width: "100%"}}
                                                    placeholder="Select a image"
                                                    optionFilterProp="label"
                                                    onChange={(value: string) => {
                                                        setImage(value)
                                                    }
                                                    }
                                                    options={[
                                                        {
                                                            value: '23-latest',
                                                            label: 'jdk-23',
                                                        },
                                                        {
                                                            value: '22-latest',
                                                            label: 'jdk-22',
                                                        },
                                                        {
                                                            value: '21-latest',
                                                            label: 'jdk-21',
                                                        },
                                                        {
                                                            value: '18-latest',
                                                            label: 'jdk-18',
                                                        },
                                                    ]}
                                                />
                                                <div
                                                    style={{marginTop: "10px"}}>{settingsPage.polluxInstanceMaxMem[locale]}(GB)
                                                </div>
                                                <InputNumber min={1} max={10} defaultValue={3} style={{width: "100%"}}
                                                             onChange={(value) => {
                                                                 if (value) setMaxMem(value + "G")
                                                             }} changeOnWheel/>
                                                <div
                                                    style={{marginTop: "10px"}}>{settingsPage.polluxInstanceMaxDisk[locale]}(GB)
                                                </div>
                                                <InputNumber min={1} max={10} defaultValue={3} style={{width: "100%"}}
                                                             onChange={(value) => {
                                                                 if (value) setMaxDisk(value + "G")
                                                             }} changeOnWheel/>
                                                <div
                                                    style={{marginTop: "10px"}}>{settingsPage.polluxInstanceCoreFile[locale]}</div>
                                                <Select
                                                    showSearch
                                                    size={"middle"}
                                                    style={{width: "100%"}}
                                                    placeholder="Select type"
                                                    optionFilterProp="label"
                                                    onChange={(value: string) => {
                                                        setCoreType(value)
                                                    }
                                                    }
                                                    options={[
                                                        {
                                                            value: 'SPIGOT',
                                                            label: 'Spigot',
                                                        },
                                                        {
                                                            value: 'PAPER',
                                                            label: 'Paper',
                                                        },
                                                        {
                                                            value: 'FABRIC',
                                                            label: 'Fabric',
                                                        },
                                                        {
                                                            value: 'FORGE',
                                                            label: 'Forge',
                                                        },
                                                        {
                                                            value: 'MOHIST',
                                                            label: 'Mohist',
                                                        },
                                                        {
                                                            value: 'CATSERVER',
                                                            label: 'Catserver',
                                                        },
                                                        {
                                                            value: 'KETTING',
                                                            label: 'Ketting',
                                                        },
                                                        {
                                                            value: 'MAGMA',
                                                            label: 'Magma',
                                                        },
                                                        {
                                                            value: 'CUSTOM',
                                                            label: 'Custom',
                                                        },
                                                    ]}
                                                />
                                                {coreType == "CUSTOM" ?
                                                    <Input
                                                        size="middle"
                                                        // placeholder="621"
                                                        placeholder={"CoreFileName"}
                                                        allowClear
                                                        style={{marginTop: "10px"}}
                                                        onChange={(value) => {
                                                            setCoreFile(value.target.value)
                                                        }}
                                                    /> : <></>
                                                }
                                                <div
                                                    style={{marginTop: "10px"}}>{settingsPage.polluxInstanceVersion[locale]}</div>
                                                <Input
                                                    size="middle"
                                                    // placeholder="621"
                                                    placeholder={"version"}
                                                    allowClear
                                                    style={{marginTop: "10px"}}
                                                    onChange={(value) => {
                                                        setCoreVersion(value.target.value)
                                                    }}
                                                />
                                            </div> : <></>}
                                    </div>
                                )
                            } else {
                                return (
                                    <></>
                                )
                            }
                        })
                    }

                </div>
            </Drawer>
        </>
    )
        ;
};

export default Settings;