import {useLocation} from "react-router-dom";
import Ansi from 'ansi-to-react-18';
import {Button, Input, Menu, MenuProps, Tree, Layout, Modal, Radio} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {
    CheckCircleFilled, CloseCircleFilled,
    CodeOutlined,
    FileOutlined,
    FolderOutlined,
    SettingOutlined
} from "@ant-design/icons";
import ethSvg from "./assets/img/ethernet.svg";
import cpuSvg from "./assets/img/cpu.svg";
// import cpu_redSvg from "./assets/img/cpu_red.svg";
import memSvg from "./assets/img/memory.svg";
// import mem_redSvg from "./assets/img/memory_red.svg";
import diskSvg from "./assets/img/harddisk.svg";
// import disk_redSvg from "./assets/img/harddisk_red.svg";
import StatusCard from "../components/InstDetail/StatusCard.tsx";
// import {settingsPage} from "./assets/ts/locale.ts";
import {postData} from "./assets/ts/req.ts";
import {instFiles, instStats, UserInfo} from "./assets/ts/type.ts";
import MonacoEditor from "@monaco-editor/react";
import type {DataNode, EventDataNode} from 'antd/es/tree';
import {useNotification} from "../components/notification.tsx";
import {generalText, instDetailPage} from "./assets/ts/locale.ts";
import './assets/css/monacoEditor.css'
import FileUpload from "../components/InstDetail/FileUpload.tsx";
import DBList from "../components/InstDetail/DBList.tsx";

const {Sider, Content} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface FetchInstFilesProps {
    castor_email: string,
    operation: string,
    inst_uuid: string,
    name?: string,
    content?: string,
    checkedList?: Array<string>
}

async function fetchInstFiles(props: FetchInstFilesProps) {
    const {castor_email, operation, inst_uuid, name, content, checkedList} = props;
    try {
        const formData = new FormData();
        formData.append('CastorEmail', castor_email);
        formData.append('Operation', operation);
        formData.append('InstUUID', inst_uuid);
        formData.append('Name', name || '');
        formData.append('Content', content || '');
        checkedList?.forEach(checkedItem => formData.append('CheckedList', checkedItem));
        return await postData('/instFiles', formData)
    } catch (err) {
        console.error(err);
    }
}

const InstDetail = () => {
    const [userInfoObj, setUserInfoObj] = useState<UserInfo>(localStorage.getItem('GPUserInfo') ? JSON.parse(atob(localStorage.getItem('GPUserInfo') as string)) : {
        avatar: '',
        username: '',
        email: '',
        isAdmin: 0
    });
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedFileContent, setSelectedFileContent] = useState('');
    const [createType, setCreateType] = useState('createFile');
    const [createName, setCreateName] = useState('');
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const dark = localStorage.getItem('dark') ?? 'false';
    const openNotification = useNotification();
    const [checkedFile, setCheckedFile] = useState<React.Key[]>([]);

    // !!!
    function instWebsocket(NodeIP: string, InstUUID: string, InstanceName: string, operate: string) {
        return new WebSocket("ws://localhost:521/castor/api/v1/instWS?NodeIP=" + NodeIP + "&InstanceName=" + InstanceName + "&InstUUID=" + InstUUID + "&Operate=" + operate + "&CastorEmail=" + userInfoObj.email);
    }

    const handleCancel = () => {
        setOpen(false);
    };

    const handleFileNew = () => {
        setConfirmLoading(true);
        console.log(createType, createName);
        fetchInstFiles({
            castor_email: userInfoObj.email,
            operation: createType,
            inst_uuid: inst_detail.inst_uuid,
            name: createName
        }).then(res => {
            if (res != undefined && res.statusCode === 200) {
                setOpen(false);
                setConfirmLoading(false);
                setCreateName('')
                // 弹出通知
                openNotification({
                    message: generalText.tip[locale],
                    description: generalText.saveSuccess[locale],
                    icon: <CheckCircleFilled style={{color: '#00ff00'}}/>
                })
                fetchInstFiles({
                    castor_email: userInfoObj.email,
                    operation: 'list',
                    inst_uuid: inst_detail.inst_uuid
                }).then((res) => {
                    if (res != undefined && res.statusCode === 200) {
                        const files = (res.body as { list: instFiles[] }).list || []
                        const sortedFiles = files.sort((a, b) => {
                            if (a.type === b.type) {
                                return a.name.localeCompare(b.name)
                            }
                            return a.type === 'dir' ? -1 : 1
                        })
                        setInstFiles(sortedFiles)
                    }
                })
            } else {
                setConfirmLoading(false);
                // 弹出通知
                openNotification({
                    message: generalText.tip[locale],
                    description: generalText.saveFailed[locale],
                    icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
                })
            }
        })
    };

    const handleFileDel = () => {
        const checkedFileArr = checkedFile.map((item) => item.toString())
        if (checkedFile) {
            fetchInstFiles({
                castor_email: userInfoObj.email,
                operation: 'delete',
                inst_uuid: inst_detail.inst_uuid,
                checkedList: checkedFileArr
            }).then((res) => {
                if (res != undefined && res.statusCode === 200) {
                    // 弹出通知
                    openNotification({
                        message: generalText.tip[locale],
                        description: generalText.saveSuccess[locale],
                        icon: <CheckCircleFilled style={{color: '#00ff00'}}/>
                    })
                    fetchInstFiles({
                        castor_email: userInfoObj.email,
                        operation: 'list',
                        inst_uuid: inst_detail.inst_uuid
                    }).then((res) => {
                        if (res != undefined && res.statusCode === 200) {
                            const files = (res.body as { list: instFiles[] }).list || []
                            const sortedFiles = files.sort((a, b) => {
                                if (a.type === b.type) {
                                    return a.name.localeCompare(b.name)
                                }
                                return a.type === 'dir' ? -1 : 1
                            })
                            setInstFiles(sortedFiles)
                        }
                    })
                } else {
                    // 弹出通知
                    openNotification({
                        message: generalText.tip[locale],
                        description: generalText.saveFailed[locale],
                        icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
                    })
                }
            })
        }
    }

    const readFile = async (_keys: React.Key[], event: { node: EventDataNode<DataNode> }) => {
        // if (event.node.type === 'file') {
        fetchInstFiles({
            castor_email: userInfoObj.email,
            operation: 'readFile',
            inst_uuid: inst_detail.inst_uuid,
            name: event.node.key as string
        }).then((res) => {
            if (res != undefined && res.statusCode === 200) {
                setSelectedFile(event.node.key as string);
                setSelectedFileContent((res.body as { content: string }).content);
            }
        })
        // setSelectedFileContent('Test File Content.');
        // }
    };

    const handleFileDownload = () => {
        // const firstCheckedFile = checkedFile[0].toString()
        if (checkedFile.length > 0) {
            const data = {
                CastorEmail: userInfoObj.email,
                InstUUID: inst_detail.inst_uuid,
                FilesName: checkedFile
            }
            const formData = new FormData();
            formData.append('CastorEmail', userInfoObj.email);
            formData.append('InstUUID', inst_detail.inst_uuid);
            data.FilesName.forEach(item => formData.append('FilesName', item.toString()));
            postData('/instFileDownload', formData, "blob").then((res) => {
                if (res.statusCode === 200) {
                    // 创建文件下载
                    const blob = new Blob([res.body as Blob]);
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = res.headers['download-file-name'];
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(url);
                }
            })
        }
    }

    // 将 instFiles 数据结构转换为 Tree 组件可用的数据
    const renderTreeNodes = (data: instFiles[]): DataNode[] =>
        data.map((item) => ({
            title: item.name,
            key: item.path,
            icon: item.type === 'dir' ? <FolderOutlined/> : <FileOutlined/>,
            children: item.children ? renderTreeNodes(item.children) : undefined,
            type: item.type,
        }));

    const locale = localStorage.getItem('locale') ?? 'EN';
    const [fakeTerminal, setFakeTerminal] = useState<string[]>([]);
    const terminalEndRef = useRef<HTMLDivElement | null>(null);
    const [command, setCommand] = useState<string>('');
    const {inst_detail} = useLocation().state;
    const [instStats, setInstStats] = useState<instStats>({cpu_percentage: "0", memory_usage: "0", disk_usage: ""});
    const wsRef = useRef<WebSocket | null>(null);
    const encoder = new TextEncoder();
    const [currentMenuKey, setCurrentMenuKey] = useState(localStorage.getItem('instDetailMenuKey') ?? 'Console');
    const [instFiles, setInstFiles] = useState<instFiles[]>();
    const items: MenuItem[] = [
        {
            label: instDetailPage.instDetailConsole[locale],
            key: 'Console',
            icon: <SettingOutlined/>,
        }, {
            label: instDetailPage.instDetailFiles[locale],
            key: 'File',
            icon: <SettingOutlined/>,
        }, {
            label: instDetailPage.instDetailDB[locale],
            key: 'Database',
            icon: <SettingOutlined/>,
        },
        // Development in progress
        // {
        //     label: instDetailPage.instDetailTask[locale],
        //     key: 'Task',
        //     icon: <SettingOutlined/>,
        // }, {
        //     label: instDetailPage.instDetailBackup[locale],
        //     key: 'Backup',
        //     icon: <SettingOutlined/>,
        // }, {
        //     label: instDetailPage.instDetailNet[locale],
        //     key: 'NetAllocated',
        //     icon: <SettingOutlined/>,
        // }
    ];

    const createTypeOptions = [
        {label: instDetailPage.instDetailFileNewTypeFile[locale], value: 'createFile'},
        {label: instDetailPage.instDetailFileNewTypeDir[locale], value: 'createDir'}
    ];

    function fetchInstStats() {
        postData("/instStats", {
            CastorEmail: userInfoObj.email,
            InstUUID: inst_detail.inst_uuid,
        }).then((res) => {
            if (res.statusCode === 200) {
                const stats = res.body as { result: { containerStats: instStats } }
                setInstStats(stats.result.containerStats)
            }
        })
    }

    useEffect(() => {
        const decoder = new TextDecoder();
        const userInfoString = decoder.decode(Uint8Array.from(atob(localStorage.getItem('GPUserInfo') as string), char => char.charCodeAt(0)));
        const userInfoObj: UserInfo = JSON.parse(userInfoString);
        setUserInfoObj(userInfoObj);

        if (localStorage.getItem('instDetailMenuKey') === null) {
            localStorage.setItem('instDetailMenuKey', 'Console');
        }

        wsRef.current = instWebsocket(inst_detail.inst_ip, inst_detail.inst_uuid, inst_detail.inst_name, "logs")
        wsRef.current.onopen = () => {
            console.log("Connected to WebSocket server");
        };
        wsRef.current.onmessage = function (event) {
            setFakeTerminal((prevLogs) => [...prevLogs, event.data])
        }
        wsRef.current.onclose = function (event) {
            console.log("Disconnected from WebSocket server:", event.code, event.reason || "Unknown reason");
        };
        wsRef.current.onerror = function (error) {
            console.error("WebSocket error:", error);
        };

        fetchInstFiles({
            castor_email: userInfoObj.email,
            operation: 'list',
            inst_uuid: inst_detail.inst_uuid
        }).then((res) => {
            if (res != undefined && res.statusCode === 200) {
                const files = (res.body as { list: instFiles[] }).list || []
                const sortedFiles = files.sort((a, b) => {
                    if (a.type === b.type) {
                        return a.name.localeCompare(b.name)
                    }
                    return a.type === 'dir' ? -1 : 1
                })
                setInstFiles(sortedFiles)
            }
        })


        const autoFetchInstStats = setInterval(() => {
            fetchInstStats()
        }, 3000)

        return () => {
            if (wsRef.current) {
                wsRef.current.close()
            }
            clearInterval(autoFetchInstStats)
        };
    }, []);

    useEffect(() => {
        // 每次 messages 更新后，自动滚动到底部
        terminalEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [fakeTerminal]);

    // 操作按钮
    const instOperate = (operate: string) => {
        wsRef.current?.close()
        wsRef.current = instWebsocket(inst_detail.inst_ip, inst_detail.inst_uuid, inst_detail.inst_name, operate)
        wsRef.current.onopen = () => {
            console.log("Connected to WebSocket server");
        };
        wsRef.current.onmessage = function (event) {
            setFakeTerminal((prevLogs) => [...prevLogs, event.data])
        }
        wsRef.current.onclose = function (event) {
            console.log("Disconnected from WebSocket server:", event.code, event.reason || "Unknown reason");
        };
        wsRef.current.onerror = function (error) {
            console.error("WebSocket error:", error);
        };
    }

    const onCommandChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCommand(e.target.value);
    }

    const handleCommandSubmit = () => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const wsCMD = encoder.encode(command)
            wsRef.current.send(wsCMD)
            setCommand('');
        } else {
            console.log('command 或 WebSocket 连接未定义或未打开');
        }
    }

    const onClick: MenuProps['onClick'] = (e) => {
        localStorage.setItem('instDetailMenuKey', e.key);
        setCurrentMenuKey(e.key);
    };

    return (
        <>
            <Menu defaultSelectedKeys={[localStorage.getItem('instDetailMenuKey') ?? 'Console']} mode="horizontal"
                  items={items} onClick={onClick}
                  style={{backgroundColor: dark === 'false' ? '#ffffff' : '#262626', paddingBottom: "5px"}}/>
            {currentMenuKey === 'Console' ?
                <div style={{width: "100%", display: "flex", flexDirection: "row"}}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        width: "80%"
                    }}>
                        <div style={{fontSize: "x-large", fontWeight: "bolder", height: "50px"}}>
                            {inst_detail.inst_name}
                        </div>
                        <div style={{borderRadius: "10px"}}>
                            <div
                                style={{
                                    backgroundColor: '#263238',
                                    color: '#ffffff',
                                    border: "10px rgba(1,1,1,0) solid",
                                    borderRadius: "10px 10px 0px 0px",
                                    overflow: "hidden",
                                    // fontFamily: 'Lato, Noto Sans SC, sans-serif;',
                                    height: '400px',
                                    overflowY: 'scroll',
                                    whiteSpace: 'pre-wrap'
                                }}>
                                {fakeTerminal.map((message, index) => (
                                    <div key={index}>
                                        <div>
                                            <Ansi>{message}</Ansi>
                                        </div>
                                        <div ref={terminalEndRef}/>
                                    </div>
                                ))}
                            </div>
                            <Input
                                className="input"
                                size="large"
                                placeholder={instDetailPage.instDetailCommand[locale]}
                                prefix={<CodeOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                                allowClear
                                value={command}
                                onChange={onCommandChange}
                                onPressEnter={handleCommandSubmit}
                                style={{
                                    backgroundColor: "rgba(38,50,56,0.9)",
                                    color: '#ffffff',
                                    borderRadius: "0px 0px 10px 10px",
                                    border: "rgba(38,50,56,0.9)"
                                }}
                            />
                        </div>
                    </div>
                    <div style={{width: "20%", display: "flex", flexDirection: "column", marginLeft: "10px"}}>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Button style={{width: "33.3%", backgroundColor: "#4870c5", color: "white"}}
                                    onClick={() => {
                                        instOperate("start")
                                    }}>{instDetailPage.instDetailStart[locale]}</Button>
                            <Button style={{width: "33.3%", backgroundColor: "#1a1a1a", color: "white"}}
                                    onClick={() => {
                                        instOperate("stop")
                                    }}>{instDetailPage.instDetailRestart[locale]}</Button>
                            <Button style={{width: "33.3%", backgroundColor: "#db5049", color: "white"}}
                                    onClick={() => {
                                        instOperate("stop")
                                    }}>{instDetailPage.instDetailStop[locale]}</Button>
                        </div>
                        <StatusCard title={instDetailPage.instDetailIP[locale]}
                                    value={inst_detail.inst_ip + " : " + inst_detail.inst_mainport}
                                    icon={ethSvg}></StatusCard>
                        <StatusCard title="CPU" value={instStats.cpu_percentage}
                                    icon={cpuSvg}></StatusCard>
                        <StatusCard title={instDetailPage.instDetailMem[locale]}
                                    value={instStats.memory_usage + " / " + inst_detail.inst_maxmem + "GB"}
                                    icon={memSvg}></StatusCard>
                        <StatusCard title={instDetailPage.instDetailDisk[locale]}
                                    value={instStats.disk_usage + " / " + inst_detail.inst_maxdisk + "GB"}
                                    icon={diskSvg}></StatusCard>
                    </div>
                </div>
                : null}
            {currentMenuKey === 'File' ?
                <div style={{
                    width: "100%",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    backgroundColor: dark === 'false' ? '#f0f2f5' : '#1a1a1a',
                }}>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: "10px 10px 0 0"
                    }}>
                        <div>
                            <Button style={{backgroundColor: dark === 'false' ? '#f0f2f5' : '#1a1a1a'}} onClick={() => {
                                setOpen(true)
                            }}>{instDetailPage.instDetailFileNew[locale]}</Button>
                            <Modal
                                title={instDetailPage.instDetailFileNew[locale]}
                                centered
                                open={open}
                                onOk={handleFileNew}
                                okText={generalText.confirm[locale]}
                                cancelText={generalText.cancel[locale]}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                            >
                                <Input
                                    className="input"
                                    size="large"
                                    placeholder={instDetailPage.instDetailFileNewPlaceholder[locale]}
                                    allowClear
                                    onChange={(e) => {
                                        setCreateName(e.target.value)
                                    }}
                                    onPressEnter={handleFileNew}
                                />
                                <Radio.Group
                                    onChange={(e) => {
                                        setCreateType(e.target.value)
                                    }}
                                    options={createTypeOptions} defaultValue="createFile" optionType="button">
                                </Radio.Group>
                            </Modal>
                            <Button style={{backgroundColor: dark === 'false' ? '#f0f2f5' : '#1a1a1a'}} onClick={() => {
                                handleFileDel()
                            }}>{instDetailPage.instDetailFileDel[locale]}</Button>
                            {/*FileUpload*/}
                            <FileUpload castor_email={userInfoObj.email} instUUID={inst_detail.inst_uuid}></FileUpload>
                            <Button style={{backgroundColor: dark === 'false' ? '#f0f2f5' : '#1a1a1a'}} onClick={() => {
                                handleFileDownload()
                            }}>{instDetailPage.instDetailFileDownload[locale]}</Button>
                        </div>
                        <Button style={{backgroundColor: dark === 'false' ? '#f0f2f5' : '#1a1a1a'}} onClick={() => {
                            fetchInstFiles({
                                castor_email: userInfoObj.email,
                                operation: 'writeFile',
                                inst_uuid: inst_detail.inst_uuid,
                                name: selectedFile,
                                content: selectedFileContent
                            }).then((res) => {
                                if (res != undefined && res.statusCode === 200) {
                                    // 弹出通知
                                    openNotification({
                                        message: generalText.tip[locale],
                                        description: generalText.saveSuccess[locale],
                                        icon: <CheckCircleFilled style={{color: '#00ff00'}}/>
                                    })
                                } else {
                                    // 弹出通知
                                    openNotification({
                                        message: generalText.tip[locale],
                                        description: generalText.saveFailed[locale],
                                        icon: <CloseCircleFilled style={{color: '#ff0000'}}/>
                                    })
                                }
                            })
                        }}>{generalText.save[locale]}</Button>
                    </div>
                    <Layout style={{
                        overflow: "hidden",
                        borderRadius: "0 0 10px 10px"
                    }}>
                        <Sider width={300} style={{}}>
                            <Tree
                                style={{
                                    backgroundColor: dark === 'false' ? '#f0f2f5' : '#1a1a1a'
                                }}
                                checkable={true}
                                checkStrictly={true}
                                onCheck={(_checkedKeys, {checkedNodes}) => {
                                    const checkedDirs = checkedNodes.map(node => node.key)
                                    // console.log(checkedDirs)
                                    if (Array.isArray(checkedDirs) && checkedDirs.length > 0) {
                                        setCheckedFile(checkedDirs)
                                    }
                                }}
                                height={530}
                                showIcon
                                treeData={renderTreeNodes(instFiles || [])}
                                onSelect={readFile}
                            />
                        </Sider>
                        <Content>
                            <div style={{
                                borderRadius: "10px 0 0 0",
                                height: "100%",
                                overflow: "hidden"
                            }}>
                                <MonacoEditor
                                    height="100%"
                                    language="yaml"
                                    defaultValue={instDetailPage.instDetailFileViewPlaceholder[locale]}
                                    value={selectedFileContent ? selectedFileContent : ""}
                                    theme={dark === 'false' ? 'light' : 'vs-dark'}
                                    options={{
                                        wordWrap: 'on'
                                    }}
                                    onChange={(e) => {
                                        if (e) {
                                            setSelectedFileContent(e)
                                        }
                                    }}
                                />
                            </div>
                        </Content>
                    </Layout>
                </div>
                : null}
            {currentMenuKey === 'Database' ?
                <DBList CastorEmail={userInfoObj.email} InstUUID={inst_detail.inst_uuid}/> : null}
            {currentMenuKey === 'Task' ? <div>Task</div> : null}
            {currentMenuKey === 'Backup' ? <div>Backup</div> : null}
            {currentMenuKey === 'NetAllocated' ? <div>NetAllocated</div> : null}
        </>
    );
}

export default InstDetail;