import Dashboard from "views/Dashboard/Dashboard";
import UserManagement from "views/UserManagement/UserManagement";
import Recording from "views/Recording/Recording";
import Analytics from "views/Analytics/Analytics";
import Sales from "views/SalesLoginUser/SalesLoginUser";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    icon: "nc-icon nc-bank",
    layout: "/admin",
  },
  {
    path: "/sales",
    name: "Sales",
    icon: "nc-icon nc-badge",
    component: Sales,
    layout: "/admin",
  },
 
  {
    path: "/user-management",
    name: "user-management",
    component: UserManagement,
    icon: "nc-icon nc-single-02",
    layout: "/admin",
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: "nc-icon nc-image",
    component: Analytics,
    layout: "/admin",
  },
];

export default routes;
