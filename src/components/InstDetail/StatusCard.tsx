import React from 'react';

// import ethSvg from "./assets/img/ethernet.svg";

interface StatusCardProps {
    title: string;
    value: string;
    icon: string;
}

const StatusCard: React.FC<StatusCardProps> = ({title, value, icon}) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            marginTop: "10px",
            paddingLeft: "10px",
            borderRadius: "10px",
        }}>
            <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#e0e0e0",
            }}>
                <img src={icon} alt="ethSvg" width="30px" height="30px"/>
            </div>
            <div style={{
                height: "70px",
                marginLeft: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around"
            }}>
                <div>{title}</div>
                <div>{value}</div>
            </div>
        </div>
    );
};

export default StatusCard;