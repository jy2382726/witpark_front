import { MenuData } from '../components/sider';
import { RouteObject } from 'react-router-dom';
import { componentMap } from '../router/routerMap';

const getRouters = (menuList: MenuData[]): RouteObject[] => {
    return menuList.map((item: MenuData) => {
        let routerObj: RouteObject = {
            path: item.key || '',
            element: componentMap[item.key as keyof typeof componentMap] || null,
        }
        if (item.children) {
            routerObj.children = getRouters(item.children);
        }
        return routerObj;
    });
        
}

export default getRouters;
