import React, {useEffect, useState} from 'react';
import {postData} from "./assets/ts/req.ts";
import {instStats, Servers, UserInfo} from "./assets/ts/type.ts";
import {Button, List} from "antd";
import {DeleteOutlined, InfoCircleTwoTone} from "@ant-design/icons";
import {useNotification} from "../components/notification.tsx";
import questionSvg from "./assets/img/question.svg";
import minecraftSvg from "./assets/img/minecraft.svg";
import ethSvg from "./assets/img/ethernet.svg";
import cpuSvg from "./assets/img/cpu.svg";
import cpu_redSvg from "./assets/img/cpu_red.svg";
import memSvg from "./assets/img/memory.svg";
import mem_redSvg from "./assets/img/memory_red.svg";
import {generalText, serverList} from "./assets/ts/locale.ts";
import {useNavigate} from "react-router-dom";
import DiskUsageIndicator from "../components/InstDetail/DiskUsageIndicator.tsx";

// const defaultUserInfoObj: UserInfo = {
//     avatar: '',
//     username: '',
//     email: '',
//     isAdmin: 0
// }
// if (!localStorage.getItem('GPUserInfo')) localStorage.setItem('GPUserInfo', btoa(JSON.stringify(defaultUserInfoObj)));


interface InstsListType {
    listAll: string;
    style?: React.CSSProperties;
}

const InstsList: React.FC<InstsListType> = ({listAll, style}) => {
    const navigate = useNavigate();
    const openNotification = useNotification();
    const [userInfoObj, setUserInfoObj] = useState<UserInfo>(localStorage.getItem('GPUserInfo') ? JSON.parse(atob(localStorage.getItem('GPUserInfo') as string)) : {
        avatar: '',
        username: '',
        email: '',
        isAdmin: 0
    });
    const [serversList, setServersList] = useState<Servers[]>([]);
    const locale = localStorage.getItem('locale') ?? 'EN';
    const dark = localStorage.getItem('dark') ?? 'false';

    async function fetchServers(listAll: string) {
        try {
            await postData('/instsList', {
                castor_email: userInfoObj.email,
                listAll: listAll
            }).then(async (res) => {
                if (res != undefined && res.statusCode === 200) {
                    const serversListData = (res.body as { instList: Servers[] }).instList == null ? [] : (res.body as {
                        instList: Servers[]
                    }).instList
                    for (const item of serversListData) {
                        const statsRes = await postData('/instStats', {
                            CastorEmail: userInfoObj.email,
                            InstUUID: item.inst_uuid
                        })
                        if (statsRes != undefined && statsRes.statusCode === 200) {
                            const instStats = (statsRes.body as { result: { containerStats: instStats } }).result
                            setServersList((prev) =>
                                prev.map((server) => server.inst_uuid === item.inst_uuid ? {
                                    ...server,
                                    cpu_percentage: instStats.containerStats.cpu_percentage,
                                    memory_usage: instStats.containerStats.memory_usage,
                                    disk_usage: instStats.containerStats.disk_usage
                                } : server)
                            )
                        }
                    }
                    // 确保实例列表更新（只在初次或列表变化时更新）
                    setServersList((prevList) =>
                        serversListData.map((server) =>
                            prevList.find((prev) => prev.inst_uuid === server.inst_uuid) ?? server
                        )
                    );
                } else {
                    // 弹出通知
                    openNotification({
                        message: generalText.tip[locale],
                        description: serverList.fetchServerListFailed[locale],
                        icon: <InfoCircleTwoTone style={{color: '#28b2e8'}}/>
                    })
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const decoder = new TextDecoder();
        const userInfoString = decoder.decode(Uint8Array.from(atob(localStorage.getItem('GPUserInfo') as string), char => char.charCodeAt(0)));
        const userInfoObj: UserInfo = JSON.parse(userInfoString);
        setUserInfoObj(userInfoObj);
        fetchServers(listAll).then(() => {
            // 弹出通知
            openNotification({
                message: generalText.tip[locale],
                description: serverList.fetchServerListSuccess[locale],
                icon: <InfoCircleTwoTone style={{color: '#28b2e8'}}/>
            })
        })
        // 离开页面时清除定时器
        const autoFetchServers = setInterval(() => {
            fetchServers(listAll)
        }, 3000)
        return () => {
            clearInterval(autoFetchServers)
        }

    }, [openNotification]);

    return (
        <>
            <List
                style={style ? style : {}}
                itemLayout="horizontal"
                dataSource={serversList}
                renderItem={(item) => (
                    <List.Item
                        style={{
                            marginTop: "10px",
                            backgroundColor: dark === "false" ? "#f5f5f5" : "#1a1a1a",
                            borderRadius: "10px",
                            cursor: "pointer"
                        }}
                        onClick={() => {
                            navigate('/instance', {
                                state: {
                                    inst_detail: {
                                        inst_name: item.inst_name,
                                        inst_game: item.inst_game,
                                        inst_ip: item.inst_ip,
                                        inst_mainport: item.inst_mainport,
                                        inst_uuid: item.inst_uuid,
                                        inst_nodeuuid: item.inst_nodeuuid,
                                        inst_maxmem: item.inst_maxmem,
                                        inst_maxdisk: item.inst_maxdisk,
                                    }
                                }
                            });
                        }}>
                        <div style={{width: "100%", height: "100%"}}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: "0px 15px"
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    width: "45%",
                                }}>
                                    <div style={{height: "50px", width: "50px"}}>
                                        {item.inst_game === "minecraft" ?
                                            <img src={minecraftSvg} alt="serverIcon"
                                                 style={{height: "50px", width: "50px"}}></img> :
                                            <img src={questionSvg} alt="serverIcon"
                                                 style={{height: "50px", width: "50px"}}></img>}
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        marginLeft: "20px",
                                        width: "100%"
                                    }}>
                                        {/* Name */}
                                        <div style={{fontSize: "1.2rem", fontWeight: "bold"}}>{item.inst_name}</div>
                                        {/* description */}
                                        <div style={{
                                            width: "100%",
                                            fontSize: "1.1rem",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>{item.inst_description}</div>
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    width: "45%",
                                    // flex: 2,
                                    gap: "1rem",
                                    textAlign: "left",
                                    // border: "1px solid #e0e0e0",
                                }}>
                                    {/* IP */}
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        flex: 2,
                                        textAlign: "left"
                                    }}>
                                        <img src={ethSvg} alt="eth" style={{width: "20px", height: "20px"}}/>
                                        <div style={{
                                            marginLeft: "10px",
                                            fontSize: '1rem'
                                        }}>{item.inst_ip}:{item.inst_mainport}</div>
                                    </div>
                                    {/* CPU */}
                                    <div style={{
                                        display: "flex", flexDirection: "row", alignItems: "center", flex: 2,
                                        textAlign: "left"
                                    }}>
                                        {parseFloat((item.cpu_percentage ?? '0%').replace('%', '')) > 70 ?
                                            <img src={cpu_redSvg} alt="eth" style={{width: "25px", height: "25px"}}/> :
                                            <img src={cpuSvg} alt="eth" style={{width: "25px", height: "25px"}}/>}
                                        <div style={{marginLeft: "10px", fontSize: '1rem'}}>{item.cpu_percentage}</div>
                                    </div>
                                    {/* Memory */}
                                    <div style={{
                                        display: "flex", flexDirection: "row", alignItems: "center", flex: 2,
                                        textAlign: "left"
                                    }}>
                                        {parseFloat((item.memory_usage ?? '0GB').replace('GB', '').trim()) / item.inst_maxmem > 0.7 ?
                                            <img src={mem_redSvg} alt="eth" style={{width: "20px", height: "20px"}}/> :
                                            <img src={memSvg} alt="eth" style={{width: "20px", height: "20px"}}/>
                                        }
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "start"
                                        }}>
                                            <div style={{
                                                marginLeft: "10px",
                                                fontSize: '1rem'
                                            }}>{item.memory_usage}</div>
                                            <div
                                                style={{marginLeft: "10px"}}>of {item.inst_maxmem}GB
                                            </div>
                                        </div>
                                    </div>
                                    {/* Disk */}
                                    <div style={{
                                        display: "flex", flexDirection: "row", alignItems: "center", flex: 2,
                                        textAlign: "left"
                                    }}>
                                        <DiskUsageIndicator item={item}/>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "start"
                                        }}>
                                            <div style={{
                                                marginLeft: "10px",
                                                fontSize: '1rem'
                                            }}>{item.disk_usage}</div>
                                            <div
                                                style={{marginLeft: "10px"}}>of {item.inst_maxdisk}GB
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delete */}
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                        <Button danger type="link"
                                                icon={<DeleteOutlined key="delete" onClick={async (event) => {
                                                    event.stopPropagation();
                                                    console.log("delete instance" + item.inst_uuid)
                                                    const formData = new FormData();
                                                    formData.append('castor_email', userInfoObj.email);
                                                    formData.append('Operate', 'del');
                                                    formData.append('InstUUID', item.inst_uuid);
                                                    await postData('/instAddDelEdit', formData).then((res) => {
                                                        if (res != undefined && res.statusCode === 200) {
                                                            // 弹出通知
                                                            openNotification({
                                                                message: generalText.tip[locale],
                                                                description: serverList.serverDeleteSuccess[locale],
                                                                icon: <InfoCircleTwoTone style={{color: '#28b2e8'}}/>
                                                            })
                                                        } else {
                                                            // 弹出通知
                                                            openNotification({
                                                                message: generalText.tip[locale],
                                                                description: serverList.serverDeleteFailed[locale],
                                                                icon: <InfoCircleTwoTone style={{color: '#28b2e8'}}/>
                                                            })
                                                        }
                                                    })
                                                }}/>}>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </>
    );
};

export default InstsList;