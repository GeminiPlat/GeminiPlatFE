import {permissionsList} from "./locale.ts";

const decoder = new TextDecoder();

function decToBin(num: number): string {
    return num.toString(2).padStart(8, '0');
}

export const adminPerms = (locale: string): { title: string, permsStatus: boolean }[] => {
    // 获取权限状态
    const userPermsObj = localStorage.getItem('GPUserPerms') ? JSON.parse(decoder.decode(Uint8Array.from(atob(localStorage.getItem('GPUserPerms') as string), char => char.charCodeAt(0)))) : {
        perms: {
            admin: 0,
            inst: 0,
            file: 0,
            bak: 0,
            net: 0,
            dbu: 0,
            task: 0
        }
    };
    const permsStatusNum: number = userPermsObj.perms.admin;
    const permsStatus = decToBin(permsStatusNum);
    return [{
        title: permissionsList.adminPermissions[locale],
        permsStatus: permsStatus[7] == '1'
    }]
}

export const instPerms = (locale: string): { title: string, permsStatus: boolean }[] => {
    // 获取权限状态
    const userPermsObj = localStorage.getItem('GPUserPerms') ? JSON.parse(decoder.decode(Uint8Array.from(atob(localStorage.getItem('GPUserPerms') as string), char => char.charCodeAt(0)))) : {
        perms: {
            admin: 0,
            inst: 0,
            file: 0,
            bak: 0,
            net: 0,
            dbu: 0,
            task: 0
        }
    };
    const permsStatusNum: number = userPermsObj.perms.inst;
    const permsStatus = decToBin(permsStatusNum);
    return [{
        title: permissionsList.instPermissionsConsole[locale],
        permsStatus: permsStatus[0] == '1'
    }, {
        title: permissionsList.instPermissionsStart[locale],
        permsStatus: permsStatus[1] == '1'
    }, {
        title: permissionsList.instPermissionsStop[locale],
        permsStatus: permsStatus[2] == '1'
    }, {
        title: permissionsList.instPermissionsRestart[locale],
        permsStatus: permsStatus[3] == '1'
    }, {
        title: permissionsList.instPermissionsEdit[locale],
        permsStatus: permsStatus[4] == '1'
    }, {
        title: permissionsList.instPermissionsImage[locale],
        permsStatus: permsStatus[5] == '1'
    }, {
        title: permissionsList.instPermissionsRename[locale],
        permsStatus: permsStatus[6] == '1'
    }, {
        title: permissionsList.instPermissionsReinstall[locale],
        permsStatus: permsStatus[7] == '1'
    }]
}

export const filePerms = (locale: string): { title: string, permsStatus: boolean }[] => {
    // 获取权限状态
    const userPermsObj = localStorage.getItem('GPUserPerms') ? JSON.parse(decoder.decode(Uint8Array.from(atob(localStorage.getItem('GPUserPerms') as string), char => char.charCodeAt(0)))) : {
        perms: {
            admin: 0,
            inst: 0,
            file: 0,
            bak: 0,
            net: 0,
            dbu: 0,
            task: 0
        }
    };
    const permsStatusNum: number = userPermsObj.perms.file;
    const permsStatus = decToBin(permsStatusNum);
    return [{
        title: permissionsList.filePermissionsCreate[locale],
        permsStatus: permsStatus[2] == '1'
    }, {
        title: permissionsList.filePermissionsDelete[locale],
        permsStatus: permsStatus[3] == '1'
    }, {
        title: permissionsList.filePermissionsWrite[locale],
        permsStatus: permsStatus[4] == '1'
    }, {
        title: permissionsList.filePermissionsRead[locale],
        permsStatus: permsStatus[5] == '1'
    }, {
        title: permissionsList.filePermissionsArchive[locale],
        permsStatus: permsStatus[6] == '1'
    }, {
        title: permissionsList.filePermissionsSFTP[locale],
        permsStatus: permsStatus[7] == '1'
    }]
}

export const bakPerms = (locale: string): { title: string, permsStatus: boolean }[] => {
    // 获取权限状态
    const userPermsObj = localStorage.getItem('GPUserPerms') ? JSON.parse(decoder.decode(Uint8Array.from(atob(localStorage.getItem('GPUserPerms') as string), char => char.charCodeAt(0)))) : {
        perms: {
            admin: 0,
            inst: 0,
            file: 0,
            bak: 0,
            net: 0,
            dbu: 0,
            task: 0
        }
    };
    const permsStatusNum: number = userPermsObj.perms.bak;
    const permsStatus = decToBin(permsStatusNum);
    return [{
        title: permissionsList.bakPermissionsCreate[locale],
        permsStatus: permsStatus[3] == '1'
    }, {
        title: permissionsList.bakPermissionsDelete[locale],
        permsStatus: permsStatus[4] == '1'
    }, {
        title: permissionsList.bakPermissionsRead[locale],
        permsStatus: permsStatus[5] == '1'
    }, {
        title: permissionsList.bakPermissionsDownload[locale],
        permsStatus: permsStatus[6] == '1'
    }, {
        title: permissionsList.bakPermissionsRestore[locale],
        permsStatus: permsStatus[7] == '1'
    }]
}

export const netPerms = (locale: string): { title: string, permsStatus: boolean }[] => {
    // 获取权限状态
    const userPermsObj = localStorage.getItem('GPUserPerms') ? JSON.parse(decoder.decode(Uint8Array.from(atob(localStorage.getItem('GPUserPerms') as string), char => char.charCodeAt(0)))) : {
        perms: {
            admin: 0,
            inst: 0,
            file: 0,
            bak: 0,
            net: 0,
            dbu: 0,
            task: 0
        }
    };
    const permsStatusNum: number = userPermsObj.perms.net;
    const permsStatus = decToBin(permsStatusNum);
    return [{
        title: permissionsList.netPermissionsCreate[locale],
        permsStatus: permsStatus[4] == '1'
    }, {
        title: permissionsList.netPermissionsDelete[locale],
        permsStatus: permsStatus[5] == '1'
    }, {
        title: permissionsList.netPermissionsUpdate[locale],
        permsStatus: permsStatus[6] == '1'
    }, {
        title: permissionsList.netPermissionsRead[locale],
        permsStatus: permsStatus[7] == '1'
    }]
}

export const dbPerms = (locale: string): { title: string, permsStatus: boolean }[] => {
    // 获取权限状态
    const userPermsObj = localStorage.getItem('GPUserPerms') ? JSON.parse(decoder.decode(Uint8Array.from(atob(localStorage.getItem('GPUserPerms') as string), char => char.charCodeAt(0)))) : {
        perms: {
            admin: 0,
            inst: 0,
            file: 0,
            bak: 0,
            net: 0,
            dbu: 0,
            task: 0
        }
    };
    const permsStatusNum: number = userPermsObj.perms.dbu;
    const permsStatus = decToBin(permsStatusNum);
    return [{
        title: permissionsList.dbPermissionsCreate[locale],
        permsStatus: permsStatus[1] == '1'
    }, {
        title: permissionsList.dbPermissionsDelete[locale],
        permsStatus: permsStatus[2] == '1'
    }, {
        title: permissionsList.dbPermissionsUpdate[locale],
        permsStatus: permsStatus[3] == '1'
    }, {
        title: permissionsList.dbPermissionsRead[locale],
        permsStatus: permsStatus[4] == '1'
    }, {
        title: permissionsList.dbPermissionsBackup[locale],
        permsStatus: permsStatus[5] == '1'
    }, {
        title: permissionsList.dbPermissionsRestore[locale],
        permsStatus: permsStatus[6] == '1'
    }, {
        title: permissionsList.dbPermissionsViewPassword[locale],
        permsStatus: permsStatus[7] == '1'
    }]
}

export const taskPerms = (locale: string): { title: string, permsStatus: boolean }[] => {
    // 获取权限状态
    const userPermsObj = localStorage.getItem('GPUserPerms') ? JSON.parse(decoder.decode(Uint8Array.from(atob(localStorage.getItem('GPUserPerms') as string), char => char.charCodeAt(0)))) : {
        perms: {
            admin: 0,
            inst: 0,
            file: 0,
            bak: 0,
            net: 0,
            dbu: 0,
            task: 0
        }
    };
    const permsStatusNum: number = userPermsObj.perms.task;
    const permsStatus = decToBin(permsStatusNum);
    return [{
        title: permissionsList.taskPermissionsCreate[locale],
        permsStatus: permsStatus[4] == '1'
    }, {
        title: permissionsList.taskPermissionsDelete[locale],
        permsStatus: permsStatus[5] == '1'
    }, {
        title: permissionsList.taskPermissionsUpdate[locale],
        permsStatus: permsStatus[6] == '1'
    }, {
        title: permissionsList.taskPermissionsRead[locale],
        permsStatus: permsStatus[7] == '1'
    }]
}