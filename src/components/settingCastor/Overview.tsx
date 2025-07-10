import {settingsPage} from "../../pages/assets/ts/locale.ts";
import {Popover, Progress, type ProgressProps} from "antd";
import React from "react";
import {systemInfoType} from "../../pages/assets/ts/type.ts";

interface OverviewProps {
    systemInfo: systemInfoType | undefined;
}

const Overview: React.FC<OverviewProps> = ({systemInfo}) => {
    const locale = localStorage.getItem('locale') ?? 'EN';
    const conicColors: ProgressProps['strokeColor'] = {
        '0%': '#87d068',
        '50%': '#ffe58f',
        '100%': '#fc5e50',
    };
    return (
        <>
            <div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}>{settingsPage.castorOverview1[locale]}&ensp;
                    <div style={{
                        backgroundColor: "#ebebeb",
                        borderRadius: "3px",
                        padding: "0px 5px"
                    }}>0.0.1-alpha
                    </div>
                    ,&ensp;{settingsPage.castorOverview3[locale]}&ensp;
                    <div style={{
                        backgroundColor: "#ebebeb",
                        borderRadius: "3px",
                        padding: "0px 5px"
                    }}>0.0.1-alpha
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}>{settingsPage.castorOverview2[locale]}&ensp;
                    <div style={{
                        backgroundColor: "#ebebeb",
                        borderRadius: "3px",
                        padding: "0px 5px"
                    }}>0.0.1-alpha
                    </div>
                    ,&ensp;{settingsPage.castorOverview3[locale]}&ensp;
                    <div style={{
                        backgroundColor: "#ebebeb",
                        borderRadius: "3px",
                        padding: "0px 5px"
                    }}>0.0.1-alpha
                    </div>
                </div>
                <div style={{marginTop: "10px"}}>
                    <h1>System Information</h1>
                    <div style={{
                        display: 'flex',
                        flexDirection: "row",
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
                            <Progress type="dashboard"
                                      percent={systemInfo ? Math.ceil(systemInfo.cpuLoad * 100) / 100 : 0}
                                      strokeColor={conicColors}
                                      status="active"
                                      success={{percent: 0}}
                            />
                            <p>CPU Usage</p>
                        </div>
                        {/*Mem*/}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Popover content={<div>Mem Detail</div>} title="Mem Detail"
                                     placement="bottom">
                                <Progress type="dashboard"
                                          percent={systemInfo ? Math.ceil((systemInfo.usedMem / systemInfo.totalMem) * 100) : 0}
                                          strokeColor={conicColors}
                                          status="active"
                                          success={{percent: 0}}
                                />
                            </Popover>
                            <p>Memory Usage</p>
                        </div>
                        {/*Disk*/}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Popover content={<div>Disk Detail</div>} title="Disk Detail"
                                     placement="bottom">
                                <Progress type="dashboard"
                                          percent={systemInfo ? Math.ceil((systemInfo.usedDisk / systemInfo.totalDisk) * 100) : 0}
                                          strokeColor={conicColors}
                                          status="active"
                                          success={{percent: 0}}
                                />
                            </Popover>
                            <p>Disk Usage</p>
                        </div>
                        {/*<p>Network*/}
                        {/*    In: &ensp;{systemInfo ? Math.round(systemInfo.networkIn / 1024 / 1024 / 1024) + "GB" : 'Loading...'}</p>*/}
                        {/*<p>Network*/}
                        {/*    Out: &ensp;{systemInfo ? Math.round(systemInfo.networkOut / 1024 / 1024 / 1024) + "GB" : 'Loading...'}</p>*/}
                    </div>
                </div>
                {/*<div>CPU负载:&ensp;{systemInfo ? systemInfo.cpuLoad.toFixed(2) + "%" : 'Loading...'}</div>*/}
            </div>
        </>
    )
}

export default Overview;