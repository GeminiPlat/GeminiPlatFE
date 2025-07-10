import diskSvg from "../../pages/assets/img/harddisk.svg";
import disk_redSvg from "../../pages/assets/img/harddisk_red.svg";

// 工具函数：将不同单位的容量转换为 GB
const convertToGB = (size: string): number => {
    const match = size.match(/^([\d.]+)\s*(KB|MB|GB|TB)$/i); // 修改正则表达式支持 K, M, G, T
    if (!match) {
        throw new Error(`Invalid disk usage format: ${size}`);
    }

    const value = parseFloat(match[1]); // 数值部分
    const unit = match[2].toUpperCase(); // 单位部分（统一为大写）

    // 根据单位转换为 GB
    switch (unit) {
        case "GB":
            return value; // GB 不变
        case "MB":
            return value / 1024; // 1 GB = 1024 MB
        case "TB":
            return value * 1024; // 1 TB = 1024 GB
        case "KB":
            return value / (1024 * 1024); // 1 GB = 1024 * 1024 KB
        default:
            throw new Error(`Unsupported unit: ${unit}`);
    }
};

const DiskUsageIndicator = ({item}: { item: { disk_usage: string; inst_maxdisk: number } }) => {
    let usageInGB: number;

    try {
        usageInGB = convertToGB(item.disk_usage ?? "0GB"); // 将 disk_usage 转换为 GB
    } catch {
        console.error(`Invalid disk usage format: ${item.disk_usage}`);
        return null; // 如果格式错误，不渲染任何内容
    }

    // 判断是否超过 0.7 的阈值
    const isOverLimit = usageInGB / item.inst_maxdisk > 0.7;

    return (
        <>
            {isOverLimit ? (
                <img src={disk_redSvg} alt="disk usage critical" style={{width: "20px", height: "20px"}}/>
            ) : (
                <img src={diskSvg} alt="disk usage normal" style={{width: "20px", height: "20px"}}/>
            )}
        </>
    );
};

export default DiskUsageIndicator;
