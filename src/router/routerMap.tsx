import { lazy } from "react";

const Dashboard = lazy(() => import('../pages/dashboard'));
const UserList = lazy(() => import('../pages/users'));
const AddUser = lazy (()=>import("../pages/users/addUser"));
const Tenement =lazy(()=>import("../pages/estate/tenement"));
const Room = lazy(()=>import("../pages/estate/rooms") )
const Car = lazy(()=>import("../pages/estate/cars"))
const Repair=lazy(()=>import("../pages/repair"))
const Contract=lazy(()=>import("../pages/finance/contracts"))
const Surrender=lazy(()=>import("../pages/finance/surrender"))
const Bill=lazy(()=>import("../pages/finance/bill"));
const Merchants=lazy(()=>import("../pages/merchants"))
const All=lazy(()=>import("../pages/operation/all"))
const Article=lazy(()=>import("../pages/operation/articles"))
const Comments=lazy(()=>import("../pages/operation/comments"))
const Equipment=lazy(()=>import("../pages/equipment"));
const Enengy=lazy(()=>import("../pages/energy"))
const Settings = lazy(() => import('../pages/settings'));
const Profile=lazy(()=>import("../pages/profile"))

export const componentMap = {
    "/dashboard": <Dashboard />,
    "/users/list": <UserList/>,
    "/users/add": <AddUser/>,
    "/estate/tenement":<Tenement/>,
    "/estate/room":<Room/>,
    "/estate/car":<Car/>,
    "/repair":<Repair/>,
    "/finance/contract":<Contract/>,
    "/finance/surrender":<Surrender/>,
    "/finance/bill":<Bill/>,
    "/merchants":<Merchants/>,
    "/operation/all":<All/>,
    "/operation/article":<Article/>,
    "/operation/comments":<Comments/>,
    "/equipment":<Equipment/>,
    "/energy":<Enengy/>,
    "/settings":<Settings/>,
    "/profile":<Profile/>
};
