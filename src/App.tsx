import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routers from './router';
import getRouters from './utils/getRouters';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, Suspense } from 'react';
import { getMenu } from "./api/users";
import { setMenuList } from "./store/login/authSlice";

function App() {
  const dispatch = useDispatch();
  const [routeObject, setRouteObject] = useState<any>(null);
  // 获取token状态，当token变化时重新执行useEffect
  const token = useSelector((state: any) => state.authSlice.token);

  useEffect(() => {
    (async () => {  // 采用匿名异步函数的方式直接调用后端接口
      const { data } = await getMenu(); // 调用后端接口获取菜单数据
      if (data.length > 0) {  // 当菜单数据不为空时重新构建路由表，否则使用默认路由表
        dispatch(setMenuList(data)); // 存储菜单数据到 Redux 状态
        // console.log("data:", data);
        const menus = getRouters(data); // 动态获取路由表
        // console.log("menus:", menus);
        // console.log("router:", routers);
        routers[0].children = menus; // 动态添加路由表
        routers[0].children[0].index = true; // 动态添加默认路由高亮
      }
      setRouteObject(createBrowserRouter(routers)); // 设置路由对象 
    })();

  }, [dispatch, token]); // 添加token作为依赖项，当登录状态变化时重新执行

  if (routeObject) {
    return (
      // 路由懒加载，避免首页加载时一次性加载所有路由组件, 懒加载需要使用Suspense组件包裹
      <Suspense fallback={<div>页面玩命加载中...</div>}>
        <div className="App">
          <RouterProvider router={routeObject} />
        </div>
      </Suspense>
    );
  } else {
    return (
      <div className="App">
        页面玩命加载中...
      </div>
    );
  }
}

export default App;
