import { useSelector } from "react-redux";
import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type RequireAuthProps = {
    allowed: boolean;
    redirectTo: string;
    children: ReactElement;
}
function RequireAuth({ allowed, redirectTo, children }: RequireAuthProps): ReactElement | null {
    const navigate = useNavigate();
    const token = useSelector((state: any) => state.authSlice.token);
    const isLogin = token ? true : false;
    useEffect(() => {
        // 检查用户登录状态是否与allowed参数匹配
        if (allowed !== isLogin) {
            // 如果登录状态与allowed参数不匹配，进行重定向
            navigate(redirectTo);
        }
    }, [isLogin, allowed, redirectTo]); // 依赖项包括登录状态、allowed参数和重定向路径

    // 如果登录状态与allowed参数匹配，返回子组件
    return allowed === isLogin ? children : null;
}

export default RequireAuth;
