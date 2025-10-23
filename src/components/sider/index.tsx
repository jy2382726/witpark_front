import React, { useState, useEffect } from 'react';
import icons from './iconList';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import logo from '../../assets/logo.png';
import './index.scss'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

// 这行代码的含义：
// 1. MenuProps 是 antd Menu 组件的 props 类型定义
// 2. Required<MenuProps> 把 MenuProps 的所有属性都变成必填（去掉可选标记）
// 3. ['items'] 取出生成菜单项的 items 属性
// 4. [number] 表示取 items 数组中任意一个元素的类型
// 综合起来：MenuItem 就是 antd Menu 组件中单个菜单项（items 数组元素）的类型别名
type MenuItem = Required<MenuProps>['items'][number];

export type MenuData = {
    key: string;
    label: string;
    icon: string;
    children?: MenuData[];
}

// 递归函数：将后端返回的菜单树结构转换为 antd Menu 所需的 items 格式
const mapMenuItems = (items: MenuData[]): MenuItem[] => {
    return items.map((item: MenuData) => ({
        key: item.key, // 菜单项的唯一标识
        label: item.label, // 菜单项显示文本
        icon: icons[item.icon], // 根据 icon 字段名从 iconList 中取出对应图标组件
        children: item.children ? mapMenuItems(item.children) : null, // 若存在子菜单，则递归处理
    }));
};

/**
 * 获取当前路由的父级菜单key
 * @param menuList 菜单数据列表
 * @param currentPath 当前路由路径
 * @returns 父级菜单key，如果没有父级则返回null
 */
const getParentKey = (menuList: MenuData[], currentPath: string): string => {
    // 遍历菜单列表查找父级
    for (const item of menuList) {
        // 如果当前菜单项有子菜单
        if (item.children && item.children.length > 0) {
            // 检查子菜单中是否有匹配当前路径的项
            const foundInChildren = item.children.some(child => child.key === currentPath);
            if (foundInChildren) {
                return item.key; // 找到父级key，直接返回
            }
        }
    }
    return ''; // 没有找到父级，返回null
};

const MySider: React.FC = () => {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    // 用于存储转换后的菜单项数据，初始为空数组
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    // 用于存储当前路由的父级菜单key
    // const [parentKey, setParentKey] = useState<string | null>(null);
    // 用于存储用户手动展开的菜单key
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    // 从 Redux 状态中获取菜单数据
    const menuList = useSelector((state: any) => state.authSlice.menuList);
    // 从路由状态中获取当前路径
    const location = useLocation();

    // 组件挂载后自动调用接口获取菜单数据，并转换为 antd Menu 所需的格式
    useEffect(() => { // useEffect 不能直接定义成 async 函数，因为它不支持 await
        // console.log('menuList:', menuList);
        setMenuItems(mapMenuItems(menuList)); // 将原始数据映射为 antd Menu 的 items 格式
        
        // 获取当前路由的父级菜单key
        const parent = getParentKey(menuList, location.pathname);
        // setParentKey(parent);
        
        // 如果存在父级key，自动展开父级菜单
        if (parent) {
            setOpenKeys([parent]);
        }
        
        // 打印父级key到控制台，方便调试
        console.log('当前路由:', location.pathname, '父级key:', parent);
    }, [menuList, location.pathname]); // 依赖菜单数据和路径变化

    // 处理点击菜单项的回调函数
    const handleClick = ({ key }: { key: string }) => {
        navigate(key);
    };

    // 处理菜单展开/收起的回调函数
    const handleOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    };

    return (
        <div className='my-sider'>
            <div className='logo'>
                <img src={logo} alt="logo" width={18} />
                <h1>朋远智慧园区</h1>
            </div>
            <Menu
                defaultSelectedKeys={['/dashboard']}
                mode="inline"
                theme="dark"
                items={menuItems}
                onClick={handleClick}
                selectedKeys={[location.pathname]}
                openKeys={openKeys}
                onOpenChange={handleOpenChange}
            />
        </div>
    );
};

// 导出父级key获取函数，供其他组件使用
export { getParentKey };

export default MySider;
