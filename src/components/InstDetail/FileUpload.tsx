import React, {useState} from 'react';
import {UploadOutlined} from '@ant-design/icons';
import type {UploadProps} from 'antd';
import {Button, message, Upload} from 'antd';
import {postData} from "../../pages/assets/ts/req.ts";
import {RcFile} from "antd/lib/upload";

interface FileUploadProps {
    castor_email: string;
    instUUID: string;
}

const FileUpload: React.FC<FileUploadProps> = ({castor_email, instUUID}) => {
        const [loading, setLoading] = useState(false);

        const handleUpload = async (file: RcFile) => {
            setLoading(true);

            const formData = new FormData();
            formData.append('uploadFile', file);
            formData.append('castor_email', castor_email);
            formData.append('instUUID', instUUID);

            try {
                const response = await postData('/instFileUpload', formData);
                if (response.statusCode === 200) {
                    message.success('文件上传成功');
                    const refresh = () => {
                        location.reload()
                    }
                    setTimeout(refresh, 1000);
                } else {
                    message.error('文件上传失败');
                }
            } catch {
                message.error('网络错误');
            } finally {
                setLoading(false);
            }
        };


        const props: UploadProps = {
            progress: {
                strokeColor: {
                    '0%': '#108ee9',
                    '100%': '#87d068',
                },
                strokeWidth: 3,
                format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
            },
        };

        return (
            <Upload
                {...props}
                customRequest={({file}) => {
                    handleUpload(file as RcFile)
                        .catch(() => {
                            message.error('文件上传失败');
                        });
                }}
                showUploadList={false}
            >
                <Button icon={<UploadOutlined/>} loading={loading}>
                    Click to Upload
                </Button>
            </Upload>
        )
    }

;

export default FileUpload;