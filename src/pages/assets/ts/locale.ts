export class loginPage {
    public static loginTitle: { [key: string]: string } = {
        CN: "登录到 GeminiPlat",
        EN: "Login to GeminiPlat",
        JP: "GeminiPlat にログイン"
    };
    public static loginEmailPlaceholder: { [key: string]: string } = {
        CN: "邮箱地址",
        EN: "Email Address",
        JP: "メールアドレス"
    };
    public static loginPasswordPlaceholder: { [key: string]: string } = {
        CN: "密码",
        EN: "Password",
        JP: "パスワード"
    };
    public static loginButton: { [key: string]: string } = {
        CN: "登录",
        EN: "Login",
        JP: "ログイン"
    };
    public static loginFailedNotify: { [key: string]: string } = {
        CN: "登陆失败",
        EN: "Login Failed",
        JP: "ログインに失敗しました"
    };
    public static loginWithEmptyEmailOrPassword: { [key: string]: string } = {
        CN: "邮箱地址或密码不能为空",
        EN: "Email Address or Password can't be empty",
        JP: "メールアドレスまたはパスワードは空にできません"
    };
    public static loginWithInvalidEmailOrPassword: { [key: string]: string } = {
        CN: "邮箱地址或密码错误",
        EN: "Email Address or Password is invalid",
        JP: "メールアドレスまたはパスワードが無効です"
    };
    public static loginWithServerError: { [key: string]: string } = {
        CN: "服务器错误",
        EN: "Server Error",
        JP: "サーバーエラー"
    };
    public static loginSuccessNotify: { [key: string]: string } = {
        CN: "登陆成功",
        EN: "Login Success",
        JP: "ログインに成功しました"
    };
    public static loginSuccessDescription: { [key: string]: string } = {
        CN: "欢迎回来",
        EN: "Welcome Back",
        JP: "おかえり"
    };
}

export class layoutPage {
    public static instance: { [key: string]: string } = {
        CN: "实例",
        EN: "Instances",
        JP: "インスタンス"
    };
    public static user: { [key: string]: string } = {
        CN: "用户",
        EN: "User",
        JP: "ユーザー"
    };
    public static settings: { [key: string]: string } = {
        CN: "设置",
        EN: "Settings",
        JP: "設定"
    };
    public static logout: { [key: string]: string } = {
        CN: "退出",
        EN: "Logout",
        JP: "ログアウト"
    };
    public static logoutDescription: { [key: string]: string } = {
        CN: "您已退出",
        EN: "You have logged out",
        JP: "ログアウトしました"
    };
}

export class serverList {
    public static fetchServerListSuccess: { [key: string]: string } = {
        CN: "服务器列表获取成功",
        EN: "Server List Fetch Success",
        JP: "サーバーリストの取得に成功しました"
    };
    public static fetchServerListFailed: { [key: string]: string } = {
        CN: "服务器列表获取失败",
        EN: "Server List Fetch Failed",
        JP: "サーバーリストの取得に失敗しました"
    };
    public static serverDeleteSuccess: { [key: string]: string } = {
        CN: "服务器删除成功",
        EN: "Server Delete Success",
        JP: "サーバーの削除に成功しました"
    };
    public static serverDeleteFailed: { [key: string]: string } = {
        CN: "服务器删除失败",
        EN: "Server Delete Failed",
        JP: "サーバーの削除に失敗しました"
    };
}

export class userPage {
    public static userInfo: { [key: string]: string } = {
        CN: "用户资料",
        EN: "User Info",
        JP: "ユーザー情報"
    };
    public static username: { [key: string]: string } = {
        CN: "用户名",
        EN: "Username",
        JP: "ユーザー名"
    };
    public static email: { [key: string]: string } = {
        CN: "邮箱",
        EN: "Email",
        JP: "メール"
    };
    public static userPerms: { [key: string]: string } = {
        CN: "权限",
        EN: "Permissions",
        JP: "権限"
    };
    public static changePassword: { [key: string]: string } = {
        CN: "更改密码",
        EN: "Change Password",
        JP: "パスワードを変更"
    };
    public static currentPassword: { [key: string]: string } = {
        CN: "当前密码",
        EN: "Current Password",
        JP: "現在のパスワード"
    };
    public static newPassword: { [key: string]: string } = {
        CN: "新密码",
        EN: "New Password",
        JP: "新しいパスワード"
    };
    public static confirmNewPassword: { [key: string]: string } = {
        CN: "确认新密码",
        EN: "Confirm New Password",
        JP: "新しいパスワードを確認"
    };
    public static nullEmailAndUsername: { [key: string]: string } = {
        CN: "邮箱和用户名不能同时为空",
        EN: "Email and Username can't be empty at the same time",
        JP: "メールアドレスとユーザー名は同時に空にできません"
    };
    public static passwordNotMatch: { [key: string]: string } = {
        CN: "密码不匹配",
        EN: "Password not match",
        JP: "パスワードが一致しません"
    };
}

export class permissionsList {
    public static permissionsDrawerTitle: { [key: string]: string } = {
        CN: "权限列表",
        EN: "Permissions List",
        JP: "権限リスト"
    };
    public static adminPermissionsTitle: { [key: string]: string } = {
        CN: "管理员权限",
        EN: "Admin Permissions",
        JP: "管理者権限"
    };
    public static adminPermissions: { [key: string]: string } = {
        CN: "管理员",
        EN: "Admin",
        JP: "管理者"
    };
    public static instPermissionsTitle: { [key: string]: string } = {
        CN: "实例权限",
        EN: "Instance Permissions",
        JP: "インスタンス権限"
    };
    public static instPermissionsConsole: { [key: string]: string } = {
        CN: "实例控制台",
        EN: "Instance Console",
        JP: "インスタンスコンソール"
    };
    public static instPermissionsStart: { [key: string]: string } = {
        CN: "启动实例",
        EN: "Start Instance",
        JP: "インスタンスを起動"
    };
    public static instPermissionsStop: { [key: string]: string } = {
        CN: "停止实例",
        EN: "Stop Instance",
        JP: "インスタンスを停止"
    };
    public static instPermissionsRestart: { [key: string]: string } = {
        CN: "重启实例",
        EN: "Restart Instance",
        JP: "インスタンスを再起動"
    };
    public static instPermissionsEdit: { [key: string]: string } = {
        CN: "编辑实例",
        EN: "Edit Instance",
        JP: "インスタンスを編集"
    };
    public static instPermissionsImage: { [key: string]: string } = {
        CN: "实例镜像",
        EN: "Instance Image",
        JP: "インスタンスイメージ"
    };
    public static instPermissionsRename: { [key: string]: string } = {
        CN: "重命名实例",
        EN: "Rename Instance",
        JP: "インスタンス名を変更"
    };
    public static instPermissionsReinstall: { [key: string]: string } = {
        CN: "重装实例",
        EN: "Reinstall Instance",
        JP: "インスタンスを再インストール"
    };
    public static filePermissionsTitle: { [key: string]: string } = {
        CN: "文件权限",
        EN: "File Permissions",
        JP: "ファイル権限"
    };
    public static filePermissionsCreate: { [key: string]: string } = {
        CN: "创建文件",
        EN: "Create File",
        JP: "ファイルを作成"
    };
    public static filePermissionsDelete: { [key: string]: string } = {
        CN: "删除文件",
        EN: "Delete File",
        JP: "ファイルを削除"
    };
    public static filePermissionsWrite: { [key: string]: string } = {
        CN: "写入文件",
        EN: "Write File",
        JP: "ファイルを書き込む"
    };
    public static filePermissionsRead: { [key: string]: string } = {
        CN: "读取文件",
        EN: "Read File",
        JP: "ファイルを読む"
    };
    public static filePermissionsArchive: { [key: string]: string } = {
        CN: "归档文件",
        EN: "Archive File",
        JP: "ファイルをアーカイブ"
    };
    public static filePermissionsSFTP: { [key: string]: string } = {
        CN: "SFTP",
        EN: "SFTP",
        JP: "SFTP"
    };
    public static bakPermissionsTitle: { [key: string]: string } = {
        CN: "备份权限",
        EN: "Backup Permissions",
        JP: "バックアップ権限"
    };
    public static bakPermissionsCreate: { [key: string]: string } = {
        CN: "创建备份",
        EN: "Create Backup",
        JP: "バックアップを作成"
    };
    public static bakPermissionsDelete: { [key: string]: string } = {
        CN: "删除备份",
        EN: "Delete Backup",
        JP: "バックアップを削除"
    };
    public static bakPermissionsRead: { [key: string]: string } = {
        CN: "查看备份",
        EN: "View Backup",
        JP: "バックアップの表示"
    };
    public static bakPermissionsDownload: { [key: string]: string } = {
        CN: "下载备份",
        EN: "Download Backup",
        JP: "バックアップをダウンロード"
    };
    public static bakPermissionsRestore: { [key: string]: string } = {
        CN: "恢复备份",
        EN: "Restore Backup",
        JP: "バックアップを復元"
    };
    public static netPermissionsTitle: { [key: string]: string } = {
        CN: "网络权限",
        EN: "Network Permissions",
        JP: "ネット割り当て権限"
    };
    public static netPermissionsCreate: { [key: string]: string } = {
        CN: "创建网络",
        EN: "Create Network",
        JP: "ネットワークを作成"
    };
    public static netPermissionsDelete: { [key: string]: string } = {
        CN: "删除网络",
        EN: "Delete Network",
        JP: "ネットワークを削除"
    };
    public static netPermissionsUpdate: { [key: string]: string } = {
        CN: "更新网络",
        EN: "Update Network",
        JP: "ネットワークを更新"
    };
    public static netPermissionsRead: { [key: string]: string } = {
        CN: "查看网络",
        EN: "View Network",
        JP: "ネットワークの表示"
    };
    public static dbPermissionsTitle: { [key: string]: string } = {
        CN: "数据库权限",
        EN: "DBHList Permissions",
        JP: "データベース権限"
    };
    public static dbPermissionsCreate: { [key: string]: string } = {
        CN: "创建数据库",
        EN: "Create DBHList",
        JP: "データベースを作成"
    };
    public static dbPermissionsDelete: { [key: string]: string } = {
        CN: "删除数据库",
        EN: "Delete DBHList",
        JP: "データベースを削除"
    };
    public static dbPermissionsUpdate: { [key: string]: string } = {
        CN: "更新数据库",
        EN: "Update DBHList",
        JP: "データベースを更新"
    };
    public static dbPermissionsRead: { [key: string]: string } = {
        CN: "查看数据库",
        EN: "View DBHList",
        JP: "データベースの表示"
    };
    public static dbPermissionsBackup: { [key: string]: string } = {
        CN: "备份数据库",
        EN: "Backup DBHList",
        JP: "データベースをバックアップ"
    };
    public static dbPermissionsRestore: { [key: string]: string } = {
        CN: "恢复数据库",
        EN: "Restore DBHList",
        JP: "データベースを復元"
    };
    public static dbPermissionsViewPassword: { [key: string]: string } = {
        CN: "查看数据库密码",
        EN: "View DBHList Password",
        JP: "データベースパスワードの表示"
    };
    public static taskPermissionsTitle: { [key: string]: string } = {
        CN: "计划任务权限",
        EN: "Task Permissions",
        JP: "タスク権限"
    };
    public static taskPermissionsCreate: { [key: string]: string } = {
        CN: "创建计划任务",
        EN: "Create Task",
        JP: "タスクを作成"
    };
    public static taskPermissionsDelete: { [key: string]: string } = {
        CN: "删除计划任务",
        EN: "Delete Task",
        JP: "タスクを削除"
    };
    public static taskPermissionsUpdate: { [key: string]: string } = {
        CN: "更新计划任务",
        EN: "Update Task",
        JP: "タスクを更新"
    };
    public static taskPermissionsRead: { [key: string]: string } = {
        CN: "查看计划任务",
        EN: "View Task",
        JP: "タスクの表示"
    };
}

export class settingsPage {
    public static castorMainMenuTitle: { [key: string]: string } = {
        CN: "Castor 管理",
        EN: "Castor Management",
        JP: "Castor 管理"
    };
    public static castorSubMenuOverview: { [key: string]: string } = {
        CN: "概况",
        EN: "Overview",
        JP: "概要"
    };
    public static castorSubMenuSettings: { [key: string]: string } = {
        CN: "设置",
        EN: "Settings",
        JP: "設定"
    };
    public static castorSubMenuUser: { [key: string]: string } = {
        CN: "用户",
        EN: "User",
        JP: "ユーザー"
    };
    public static polluxMainMenuTitle: { [key: string]: string } = {
        CN: "Pollux 管理",
        EN: "Pollux Management",
        JP: "Pollux 管理"
    };
    // public static polluxSubMenuRegion: { [key: string]: string } = {
    //     CN: "地域",
    //     EN: "Region",
    //     JP: "地域"
    // };
    public static polluxSubMenuNode: { [key: string]: string } = {
        CN: "节点",
        EN: "Node",
        JP: "ノード"
    };
    public static polluxSubMenuInstance: { [key: string]: string } = {
        CN: "实例",
        EN: "Instance",
        JP: "インスタンス"
    };
    public static polluxSubMenuDatabase: { [key: string]: string } = {
        CN: "数据库",
        EN: "Database",
        JP: "データベース"
    };
    public static serviceMainMenuTitle: { [key: string]: string } = {
        CN: "服务管理",
        EN: "Service Management",
        JP: "サービス管理"
    };
    public static serviceSubMenuMount: { [key: string]: string } = {
        CN: "挂载",
        EN: "Mount",
        JP: "マウント"
    };
    public static serviceSubMenuPresetGroup: { [key: string]: string } = {
        CN: "预设组",
        EN: "Preset Group",
        JP: "プリセットグループ"
    };
    public static castorOverview1: { [key: string]: string } = {
        CN: "当前正在运行Castor_Panel版本:",
        EN: "Currently running Castor_Panel version:",
        JP: "現在のCastor_Panelバージョン:"
    };
    public static castorOverview2: { [key: string]: string } = {
        CN: "当前正在运行Castor_TinyAPI版本:",
        EN: "Currently running Castor_TinyAPI version:",
        JP: "現在のCastor_TinyAPIバージョン:"
    };
    public static castorOverview3: { [key: string]: string } = {
        CN: "最新版本:",
        EN: "Latest version:",
        JP: "最新バージョン:"
    };
    public static polluxNodeAdd: { [key: string]: string } = {
        CN: "添加节点",
        EN: "Add Node",
        JP: "ノードを追加"
    };
    public static polluxNodeEdit: { [key: string]: string } = {
        CN: "编辑节点",
        EN: "Edit Node",
        JP: "ノードを編集"
    };
    public static polluxNodeDelete: { [key: string]: string } = {
        CN: "删除节点",
        EN: "Delete Node",
        JP: "ノードを削除"
    };
    public static polluxNodeName: { [key: string]: string } = {
        CN: "节点名称",
        EN: "Node Name",
        JP: "ノード名"
    };
    public static polluxNodeIP: { [key: string]: string } = {
        CN: "节点IP",
        EN: "Node IP",
        JP: "ノードIP"
    };
    public static polluxNodePort: { [key: string]: string } = {
        CN: "节点端口",
        EN: "Node Port",
        JP: "ノードポート"
    };
    public static polluxNodeVer: { [key: string]: string } = {
        CN: "节点版本",
        EN: "Node Version",
        JP: "ノードバージョン"
    };
    public static polluxNodeUUID: { [key: string]: string } = {
        CN: "节点UUID",
        EN: "Node UUID",
        JP: "ノードUUID"
    };
    public static polluxNodeInstCount: { [key: string]: string } = {
        CN: "实例数量",
        EN: "Instance Count",
        JP: "インスタンス数"
    };
    public static polluxNodeAuthToken: { [key: string]: string } = {
        CN: "节点验证Token",
        EN: "Node AuthToken",
        JP: "ノード認証トークン"
    }
    public static polluxInstanceAdd: { [key: string]: string } = {
        CN: "添加实例",
        EN: "Add Instance",
        JP: "インスタンスを追加"
    }
    public static polluxInstanceGame: { [key: string]: string } = {
        CN: "游戏",
        EN: "Game",
        JP: "ゲーム"
    }
    public static polluxInstanceNode: { [key: string]: string } = {
        CN: "所属Pollux节点",
        EN: "Node of Pollux",
        JP: "Polluxノード"
    }
    public static polluxInstancePort: { [key: string]: string } = {
        CN: "端口分配",
        EN: "Port Allocation",
        JP: "ポート割り当て"
    }
    public static polluxInstanceSetupOnly: { [key: string]: string } = {
        CN: "仅创建",
        EN: "Setup Only",
        JP: "セットアップのみ"
    }
    public static polluxInstanceName: { [key: string]: string } = {
        CN: "实例名称",
        EN: "Instance Name",
        JP: "インスタンス名"
    }
    public static polluxInstanceDescription: { [key: string]: string } = {
        CN: "实例描述",
        EN: "Instance Description",
        JP: "インスタンスの説明"
    }
    public static polluxInstanceImage: { [key: string]: string } = {
        CN: "实例镜像",
        EN: "Instance Image",
        JP: "インスタンスイメージ"
    }
    public static polluxInstanceMaxMem: { [key: string]: string } = {
        CN: "实例最大内存分配",
        EN: "Instance Max Memory Allocation",
        JP: "インスタンス最大メモリ割り当て"
    }
    public static polluxInstanceMaxDisk: { [key: string]: string } = {
        CN: "实例最大磁盘分配",
        EN: "Instance Max Disk Allocation",
        JP: "インスタンス最大ディスク割り当て"
    }
    public static polluxInstanceCoreFile: { [key: string]: string } = {
        CN: "核心文件",
        EN: "Core File",
        JP: "コアファイル"
    }
    public static polluxInstanceVersion: { [key: string]: string } = {
        CN: "版本",
        EN: "Version",
        JP: "バージョン"
    }
    public static polluxDBHAdd: { [key: string]: string } = {
        CN: "添加数据库主机",
        EN: "Add Database Host",
        JP: "データベースホストを追加"
    }
    public static polluxDBHName: { [key: string]: string } = {
        CN: "数据库主机名称",
        EN: "Database Host Name",
        JP: "データベースホスト名"
    }
    public static polluxDBHIP: { [key: string]: string } = {
        CN: "IP",
        EN: "IP",
        JP: "IP"
    }
    public static polluxDBHPort: { [key: string]: string } = {
        CN: "端口",
        EN: "Port",
        JP: "ポート"
    }
    public static polluxDBHUsername: { [key: string]: string } = {
        CN: "用户名",
        EN: "Username",
        JP: "ユーザー名"
    }
    public static polluxDBHPassword: { [key: string]: string } = {
        CN: "密码",
        EN: "Password",
        JP: "パスワード"
    }
    public static polluxDBHUUID: { [key: string]: string } = {
        CN: "UUID",
        EN: "UUID",
        JP: "UUID"
    }
    public static polluxDBHAction: { [key: string]: string } = {
        CN: "操作",
        EN: "Action",
        JP: "操作"
    }
}

export class instDetailPage {
    public static instDetailConsole: { [key: string]: string } = {
        CN: "控制台",
        EN: "Console",
        JP: "コンソール"
    }
    public static instDetailFiles: { [key: string]: string } = {
        CN: "文件",
        EN: "Files",
        JP: "ファイル"
    }
    public static instDetailDB: { [key: string]: string } = {
        CN: "数据库",
        EN: "Database",
        JP: "データベース"
    }
    public static instDetailTask: { [key: string]: string } = {
        CN: "计划任务",
        EN: "Task",
        JP: "タスク"
    }
    public static instDetailBackup: { [key: string]: string } = {
        CN: "备份",
        EN: "Backup",
        JP: "バックアップ"
    }
    public static instDetailNet: { [key: string]: string } = {
        CN: "网络分配",
        EN: "Network",
        JP: "ネットワーク"
    }
    public static instDetailCommand: { [key: string]: string } = {
        CN: "在此输入命令",
        EN: "Commands Here",
        JP: "ここにコマンドを入力"
    }
    public static instDetailStart: { [key: string]: string } = {
        CN: "启动",
        EN: "Start",
        JP: "起動"
    }
    public static instDetailRestart: { [key: string]: string } = {
        CN: "重启",
        EN: "Restart",
        JP: "再起動"
    }
    public static instDetailStop: { [key: string]: string } = {
        CN: "停止",
        EN: "Stop",
        JP: "停止"
    }
    public static instDetailIP: { [key: string]: string } = {
        CN: "实例IP",
        EN: "Instance IP",
        JP: "インスタンスIP"
    }
    public static instDetailMem: { [key: string]: string } = {
        CN: "内存",
        EN: "Memory",
        JP: "メモリ"
    }
    public static instDetailDisk: { [key: string]: string } = {
        CN: "存储空间",
        EN: "Disk Space",
        JP: "ディスク容量"
    }
    public static instDetailFileNew: { [key: string]: string } = {
        CN: "新建",
        EN: "New",
        JP: "新しい"
    }
    public static instDetailFileDel: { [key: string]: string } = {
        CN: "删除",
        EN: "Delete",
        JP: "削除"
    }
    public static instDetailFileDownload: { [key: string]: string } = {
        CN: "下载",
        EN: "Download",
        JP: "ダウンロード"
    }
    public static instDetailFileNewPlaceholder: { [key: string]: string } = {
        CN: "文件名",
        EN: "File Name",
        JP: "ファイル名"
    }
    public static instDetailFileNewTypeFile: { [key: string]: string } = {
        CN: "文件",
        EN: "File",
        JP: "ファイル"
    }
    public static instDetailFileNewTypeDir: { [key: string]: string } = {
        CN: "文件夹",
        EN: "Directory",
        JP: "ディレクトリ"
    }
    public static instDetailFileViewPlaceholder: { [key: string]: string } = {
        CN: "选择文件来查看其内容",
        EN: "Select a file to view its content",
        JP: "ファイルを選択してその内容を表示"
    }
}

export class generalText {
    public static confirm: { [key: string]: string } = {
        CN: "确认",
        EN: "Confirm",
        JP: "確認"
    }
    public static cancel: { [key: string]: string } = {
        CN: "取消",
        EN: "Cancel",
        JP: "キャンセル"
    };
    public static save: { [key: string]: string } = {
        CN: "保存",
        EN: "Save",
        JP: "保存"
    };
    public static saveSuccess: { [key: string]: string } = {
        CN: "保存成功",
        EN: "Save Success",
        JP: "保存に成功しました"
    };
    public static saveFailed: { [key: string]: string } = {
        CN: "保存失败",
        EN: "Save Failed",
        JP: "保存に失敗しました"
    };
    public static addSuccess: { [key: string]: string } = {
        CN: "添加成功",
        EN: "Add Success",
        JP: "追加に成功しました"
    };
    public static addFailed: { [key: string]: string } = {
        CN: "添加失败",
        EN: "Add Failed",
        JP: "追加に失敗しました"
    };
    public static deleteConfirm: { [key: string]: string } = {
        CN: "确认删除?",
        EN: "Confirm Delete?",
        JP: "削除を確認?"
    };
    public static deleteSuccess: { [key: string]: string } = {
        CN: "删除成功",
        EN: "Delete Success",
        JP: "削除に成功しました"
    };
    public static deleteFailed: { [key: string]: string } = {
        CN: "删除失败",
        EN: "Delete Failed",
        JP: "削除に失敗しました"
    };
    public static tip: { [key: string]: string } = {
        CN: "提示",
        EN: "Tip",
        JP: "ヒント"
    };
    public static peek: { [key: string]: string } = {
        CN: "查看",
        EN: "View",
        JP: "チェック"
    };
}