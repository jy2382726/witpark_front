import { Breadcrumb } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { MenuData } from '../sider';

type BreadcrumbItem = {
    title: string;
}

/**
 * 根据菜单列表和当前路径，递归生成面包屑导航项
 * @param menuList 菜单数据
 * @param pathname 当前路由路径
 * @returns 面包屑项数组
 */
const getBreadcrumbItems = (menuList: MenuData[], pathname: string): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [];
    // 遍历菜单列表
    for (const item of menuList) {
        // 如果当前菜单有子菜单，则递归查找
        if (item.children && Array.isArray(item.children)) {
            // 递归调用，在子菜单中继续查找匹配的路径
            const childItems = getBreadcrumbItems(item.children, pathname);
            // 关键点：如果子菜单中找到了匹配的路径（childItems.length > 0）
            // 说明当前父菜单项是目标路径的祖先节点，需要将其 label 也加入面包屑
            if (childItems.length > 0) {
                // 先放入父级菜单的 label，再展开子级匹配到的所有面包屑项
                // 这样就能形成“父级 > 子级 > 孙级...”的完整链条
                items.push({ title: item.label }, ...childItems);
                break; // 找到完整路径后立即终止循环，避免多余查找
            }
        } else if (item.key === pathname) {
            // 当前菜单项的路径与目标路径一致，加入结果
            items.push({ title: item.label });
            break;
        }
    }
    return items;
};

const MyBreadcrumb: React.FC = () => {
  const location = useLocation();
  const menuList = useSelector((state: any) => state.authSlice.menuList);
  const items = getBreadcrumbItems(menuList, location.pathname);
  return (
    <Breadcrumb className="mt mb" items={items} />
  );
}

export default MyBreadcrumb;
