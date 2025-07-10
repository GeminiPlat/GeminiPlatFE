import React from "react";

export interface Servers extends instStats {
    inst_uuid: string;
    inst_nodeuuid: string;
    inst_game: string;
    inst_name: string;
    inst_description: string;
    inst_ip: string;
    inst_mainport: number;
    cpu_percentage: string;
    memory_usage: string;
    inst_maxmem: number;
    disk_usage: string;
    inst_maxdisk: number;
    instPerm: number;
    filePerm: number;
    bakPerm: number;
    netPerm: number;
    dbuPerm: number;
    taskPerm: number;
}

// export class Servers {
//     inst_uuid: string;
//     inst_nodeuuid: string;
//     inst_game: string;
//     inst_name: string;
//     inst_description: string;
//     inst_ip: string;
//     inst_mainport: number;
//     cpu_percentage: string = '0%';
//     memory_usage: string = '0GB';
//     inst_maxmem: number;
//     disk_usage: string = '0GB';
//     inst_maxdisk: number;
//     instPerm: number;
//     filePerm: number;
//     bakPerm: number;
//     netPerm: number;
//     dbuPerm: number;
//     taskPerm: number;
//
//     constructor(inst_uuid: string, inst_nodeuuid: string, inst_game: string, inst_name: string, inst_description: string, inst_ip: string, inst_mainport: number, cpu_percentage: string, memory_usage: string, inst_maxmem: number, disk_usage: string, inst_maxdisk: number, instPerm: number, filePerm: number, bakPerm: number, netPerm: number, dbuPerm: number, taskPerm: number) {
//         this.inst_uuid = inst_uuid;
//         this.inst_nodeuuid = inst_nodeuuid;
//         this.inst_game = inst_game;
//         this.inst_name = inst_name;
//         this.inst_description = inst_description;
//         this.inst_ip = inst_ip;
//         this.inst_mainport = inst_mainport;
//         this.cpu_percentage = cpu_percentage;
//         this.memory_usage = memory_usage;
//         this.inst_maxmem = inst_maxmem;
//         this.disk_usage = disk_usage;
//         this.inst_maxdisk = inst_maxdisk;
//         this.instPerm = instPerm;
//         this.filePerm = filePerm;
//         this.bakPerm = bakPerm;
//         this.netPerm = netPerm;
//         this.dbuPerm = dbuPerm;
//         this.taskPerm = taskPerm;
//     }
// }


export interface UserInfo {
    avatar: string;
    username: string;
    email: string;
    isAdmin: number;
}

export class perms {
    admin: object = {isAdmin: 0};
    instance: object = {
        inst_console: 0,
        inst_start: 0,
        inst_stop: 0,
        inst_restart: 0,
        inst_edit: 0,
        inst_image: 0,
        inst_rename: 0,
        inst_reinstall: 0,
    };
    file: object = {
        file_create: 0,
        file_delete: 0,
        file_write: 0,
        file_read: 0,
        file_archive: 0,
        file_sftp: 0,
    };
    bak: object = {
        bak_create: 0,
        bak_delete: 0,
        bak_read: 0,
        bak_download: 0,
        bak_restore: 0,
    };
    net: object = {
        net_create: 0,
        net_delete: 0,
        net_update: 0,
        net_read: 0,
    };
    db: object = {
        db_create: 0,
        db_delete: 0,
        db_update: 0,
        db_read: 0,
        db_backup: 0,
        db_restore: 0,
        db_viewPassword: 0,
    };
    task: object = {
        task_create: 0,
        task_delete: 0,
        task_update: 0,
        task_read: 0,
    };
}

export interface systemInfoType {
    cpuLoad: number;
    totalMem: number;
    freeMem: number;
    usedMem: number;
    totalDisk: number;
    usedDisk: number;
    freeDisk: number;
    networkIn: number;
    networkOut: number;
}

export class nodeInfoType {
    node_uuid: string;
    node_name: string;
    node_insts_count: number;
    node_ip: string;
    node_port: number;
    node_ver: string;
    node_os: string;
    node_health: boolean = false;

    constructor(node_uuid: string, node_name: string, node_inst_count: number, node_ip: string, node_port: number, node_ver: string, node_os: string, node_health: boolean) {
        this.node_uuid = node_uuid;
        this.node_name = node_name;
        this.node_insts_count = node_inst_count;
        this.node_ip = node_ip;
        this.node_port = node_port;
        this.node_ver = node_ver;
        this.node_os = node_os;
        this.node_health = node_health;
    }
}

export interface instFiles {
    name: string;
    path: string;
    type: 'file' | 'dir';
    children?: instFiles[];
}

export interface DBHListType {
    key: string;
    DBH_IP: string;
    DBH_Name: string;
    DBH_Port: string;
    DBH_UUID: string;
    DBH_Username: string;
    action: React.ReactNode;
}

export interface instStats {
    cpu_percentage: string;
    memory_usage: string;
    disk_usage: string;
}

export interface DBListType {
    DBH_IP: string;
    DBH_Port: string;
    DB_Name: string;
    DB_Username: string;
    DB_Password: string;
    DB_UUID: string;
}