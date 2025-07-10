import {BrowserRouter as Router} from "react-router-dom";
import RouterConfig from "./components/router.tsx";
import {NotificationProvider} from "./components/notification.tsx";
import '@fontsource/lato';
import '@fontsource/noto-sans-sc';
import './App.css'
import {useEffect, useState} from "react";
import {Drawer, FloatButton, List, Radio, RadioChangeEvent} from "antd";
import {
    createFromIconfontCN,
    MoonOutlined,
    QuestionCircleOutlined,
    SunOutlined
} from "@ant-design/icons";

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_4700024_clxwfj2rjjf.js',
});

const localeList = ['CN', 'EN', 'JP'];

const localeShowList = [
    {
        Lang: '中文',
    },
    {
        Lang: 'English',
    },
    {
        Lang: '日本語',
    }
];

function App() {
    const [openHelp, setOpenHelp] = useState<boolean>(false);
    const [openLocaleDialog, setOpenLocaleDialog] = useState(false);
    const [locale, setLocale] = useState('');
    const [dark, setDark] = useState(false);
    useEffect(() => {
        const userLanguage = localStorage.getItem('locale') ?? navigator.language.toUpperCase() ? navigator.language.toUpperCase() : 'EN';
        setLocale(userLanguage);
        localStorage.setItem('locale', userLanguage);
        if (localStorage.getItem('layoutMenuKey') === null) {
            localStorage.setItem('layoutMenuKey', '1');
        }
    }, []);

    const handleOpenLocaleDialog = () => {
        setOpenLocaleDialog(true);
    };

    const onClose = () => {
        setOpenLocaleDialog(false);
    };

    function handleLocaleChange(e: RadioChangeEvent) {
        localStorage.setItem('locale', localeList[e.target.value]);
    }

    return (
        <>
            <NotificationProvider>
                <Router>
                    <RouterConfig/>
                </Router>
            </NotificationProvider>
            <FloatButton.Group
                open={openHelp}
                trigger="click"
                style={{insetInlineEnd: 24}}
                icon={<QuestionCircleOutlined/>}
                onClick={() => {
                    setOpenHelp(!openHelp)
                }}
            >
                <FloatButton icon={<IconFont type="icon-translate-copy"/>} onClick={handleOpenLocaleDialog}/>
                <FloatButton icon={dark ? <MoonOutlined/> : <SunOutlined/>} onClick={() => {
                    setDark(!dark);
                    localStorage.setItem('dark', String(dark));
                }}/>
            </FloatButton.Group>

            <Drawer
                title="Languages"
                placement="right"
                closable={false}
                onClose={onClose}
                open={openLocaleDialog}
            >
                <Radio.Group defaultValue={locale} onChange={handleLocaleChange} buttonStyle="solid">
                    <List
                        itemLayout="horizontal"
                        dataSource={localeShowList}
                        renderItem={(item, index) => (
                            <Radio.Button value={index}>{item.Lang}</Radio.Button>
                        )}
                    />
                </Radio.Group>
            </Drawer>
        </>
    );
}

export default App
